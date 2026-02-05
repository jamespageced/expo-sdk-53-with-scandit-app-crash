import React, { useEffect, useRef } from 'react';
import { Alert, AppState, AppStateStatus } from 'react-native';
import {
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureSession,
  BarcodeCaptureSettings,
  Symbology,
  SymbologyDescription
} from 'scandit-react-native-datacapture-barcode';
import {
  Camera,
  DataCaptureView,
  FrameSourceState,
  RectangularViewfinder,
  RectangularViewfinderStyle,
  RectangularViewfinderLineStyle,
  VideoResolution
} from 'scandit-react-native-datacapture-core';
import { useNavigation } from '@react-navigation/native';
import dataCaptureContext from './CaptureContext';
import { requestCameraPermissionsIfNeeded } from './camera-permission-handler';
import type { StackNavigationProp } from '@react-navigation/stack';

export const ScanPage = () => {
  //===========================================================================
  //================================ variables ================================
  //===========================================================================
  const navigation: any = useNavigation<StackNavigationProp<any>>();
  const refView = useRef<DataCaptureView>(null);
  const refBarcodeCaptureMode = useRef<BarcodeCapture | null>(null);
  const refCamera = useRef<Camera | null>(null);

  //===========================================================================
  //================================ functions ================================
  //===========================================================================
  const handleAppStateChange = async (nextAppState: AppStateStatus): Promise<void> => {
    if (nextAppState.match(/inactive|background/)) {
      await stopCapture();
    } else {
      await startCapture();
    }
  };
  //---------------------------------------------------------------------------
  async function setupCamera(): Promise<void> {
    try {
      await requestCameraPermissionsIfNeeded(); // will skip to catch error if user denies permissions
      // Use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
      // default and must be turned on to start streaming frames to the data capture context for recognition.
      const initCamera = Camera.default;
      // Camera is null if the camera is not available on the device.
      if (!initCamera) {
        throw new Error('Failed to initialize camera - camera not available on device');
      }
      // Apply settings to the camera
      const cameraSettings = BarcodeCapture.createRecommendedCameraSettings();
      cameraSettings.preferredResolution = VideoResolution.FullHD;
      await initCamera.applySettings(cameraSettings);
      // Set the camera as the frame source of the data capture context.
      await dataCaptureContext.setFrameSource(initCamera);
      // Switch the camera on to start streaming frames and enable the barcode capture mode.
      await initCamera.switchToDesiredState(FrameSourceState.On);
      refCamera.current = initCamera;
      setupScanning();
      setupOverlay();
    } catch (err: any) {
      console.log('error:', err.message);
      handleGoBack();
    }
  }
  //---------------------------------------------------------------------------
  function setupScanning(): void {
    // The barcode capturing process is configured through barcode capture settings
    // and are then applied to the barcode capture instance that manages barcode recognition.
    const settings = new BarcodeCaptureSettings();

    // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
    // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
    // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
    settings.enableSymbologies([
      Symbology.EAN13UPCA,
      Symbology.EAN8,
      Symbology.UPCE,
      Symbology.QR,
      Symbology.DataMatrix,
      Symbology.Code39,
      Symbology.Code128,
      Symbology.InterleavedTwoOfFive
    ]);

    // Some linear/1d barcode symbologies allow you to encode variable-length data. By default, the Scandit
    // Data Capture SDK only scans barcodes in a certain length range. If your application requires scanning of one
    // of these symbologies, and the length is falling outside the default range, you may need to adjust the "active
    // symbol counts" for this symbology. This is shown in the following few lines of code for one of the
    // variable-length symbologies.
    const symbologySettings = settings.settingsForSymbology(Symbology.Code39);
    symbologySettings.activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    // Create new barcode capture mode with the settings from above.
    const barcodeCapture = new BarcodeCapture(settings);

    // By default, every time a barcode is scanned, a sound (if not in silent mode) and a vibration are played.
    // Uncomment the following lines to set a success feedback without sound and vibration.
    // const feedback = BarcodeCaptureFeedback.default;
    // feedback.success = new Feedback(null, null);
    // barcodeCapture.feedback = feedback;
    // Uncomment the following line to set a success feedback without sound and vibration.
    // const defaultFeedback = Feedback.defaultFeedback;

    // Register a listener to get informed whenever a new barcode got recognized.
    const barcodeCaptureListener = {
      didScan: async (_: BarcodeCapture, session: BarcodeCaptureSession) => {
        const barcode = session.newlyRecognizedBarcode;
        if (barcode == null) return;

        const symbology = new SymbologyDescription(barcode.symbology);

        // The `alert` call blocks execution until it's dismissed by the user. As no further frames would be processed
        // until the alert dialog is dismissed, we're showing the alert through a timeout and disabling the barcode
        // capture mode until the dialog is dismissed, as you should not block the BarcodeCaptureListener callbacks for
        // longer periods of time. See the documentation to learn more about this.
        barcodeCapture.isEnabled = false;

        // Use the following code to reject barcodes.
        // By uncommenting the following lines, barcodes not starting with 09: are ignored.
        // if (!barcode.data?.startsWith('09:')) {
        //    // We temporarily change the brush, used to highlight recognized barcodes, to a transparent brush.
        //   overlay.brush = Brush.transparent;
        //   return;
        // }
        // Otherwise, if the barcode is of interest, we want to use a brush to highlight it.
        // overlay.brush = new Brush(
        //   Color.fromHex('FFF0'),
        //   Color.fromHex('FFFF'),
        //   3
        // );

        // We also want to emit a feedback (vibration and, if enabled, sound).
        // By default, every time a barcode is scanned, a sound (if not in silent mode) and a vibration are played.
        // To emit a feedback only when necessary, it is necessary to set a success feedback without sound and
        // vibration when setting up Barcode Capture (in this case in the `setupScanning`).
        // defaultFeedback.emit();

        Alert.alert(
          '',
          `Scanned: ${barcode.data} (${symbology.readableName})`,
          [{ text: 'OK', onPress: () => (barcodeCapture.isEnabled = true) }],
          { cancelable: false }
        );
      }
    };

    // Add the listener to the barcode capture context.
    barcodeCapture.addListener(barcodeCaptureListener);

    // Set the barcode capture mode to the data capture context.
    dataCaptureContext.setMode(barcodeCapture);
    refBarcodeCaptureMode.current = barcodeCapture;
  }
  //---------------------------------------------------------------------------
  function setupOverlay(): void {
    try {
      if (!refBarcodeCaptureMode.current) {
        throw new Error('Cannot setup overlay - BarcodeCapture');
      }
      // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
      // the video preview, using the Frame overlay style. This is optional, but recommended for better visual feedback.
      const overlay = new BarcodeCaptureOverlay(refBarcodeCaptureMode.current);
      overlay.viewfinder = new RectangularViewfinder(
        RectangularViewfinderStyle.Square,
        RectangularViewfinderLineStyle.Light
      );
      refView.current?.addOverlay(overlay);
    } catch (err: any) {
      console.log('error:', err.message);
      handleGoBack();
    }
  }
  //---------------------------------------------------------------------------
  const startCapture = async () => {
    if (refBarcodeCaptureMode.current === null) return;
    await startCamera();
    refBarcodeCaptureMode.current.isEnabled = true;
  };
  //---------------------------------------------------------------------------
  const stopCapture = async () => {
    if (refBarcodeCaptureMode.current === null) return;
    refBarcodeCaptureMode.current.isEnabled = false;
    await stopCamera();
  };
  //---------------------------------------------------------------------------
  const stopCamera = async () => {
    if (refCamera.current) {
      await refCamera.current.switchToDesiredState(FrameSourceState.Off);
    }
  };
  //---------------------------------------------------------------------------
  const startCamera = async () => {
    if (refCamera.current) {
      await refCamera.current.switchToDesiredState(FrameSourceState.On);
    }
  };

  //---------------------------------------------------------------------------
  const handleGoBack = () => {
    navigation.goBack();
  };

  //===========================================================================
  //================================== setup ==================================
  //===========================================================================
  useEffect(() => {
    setupCamera();
    const handleAppStateChangeSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      handleAppStateChangeSubscription.remove();
      stopCapture();
      if (refBarcodeCaptureMode.current) dataCaptureContext.removeMode(refBarcodeCaptureMode.current);
    };
  }, []);

  //===========================================================================
  //================================== render =================================
  //===========================================================================
  return <DataCaptureView style={{ flex: 1 }} context={dataCaptureContext} ref={refView} />;
};
