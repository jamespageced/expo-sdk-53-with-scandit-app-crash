import { DataCaptureContext } from 'scandit-react-native-datacapture-core';

const { EXPO_PUBLIC_SCANDIT_LICENSE_KEY } = process.env;

// Enter your Scandit License key here.
// Your Scandit License key is available via your Scandit SDK web account.
DataCaptureContext.initialize(EXPO_PUBLIC_SCANDIT_LICENSE_KEY);

export default DataCaptureContext.sharedInstance;
