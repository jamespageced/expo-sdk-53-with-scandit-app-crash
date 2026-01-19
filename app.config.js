module.exports = {
  name: process.env.EXPO_PUBLIC_APP_NAME,
  slug: process.env.EXPO_PUBLIC_APP_SLUG,
  version: process.env.EXPO_PUBLIC_APP_VERSION,
  // scheme: 'msauth',
  orientation: 'portrait',
  icon: `./assets/${process.env.EXPO_PUBLIC_APP_IOS_ICON}`,
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  backgroundColor: process.env.EXPO_PUBLIC_APP_DEFAULT_BACKGROUNDCOLOR,
  assetBundlePatterns: ['**/*'],
  ios: {
    icon: {
      backgroundColor: process.env.EXPO_PUBLIC_APP_IOS_ICON_BACKGROUNDCOLOR
    },
    infoPlist: {
      NSCameraUsageDescription: `Your camera will be used to scan barcodes or take pictures for ${process.env.EXPO_PUBLIC_APP_NAME}.`,
      NSLocationWhenInUseUsageDescription: 'Your locations information will be used whenever you access the inventory.'
    },
    supportsTablet: true,
    // googleServicesFile: './GoogleService-Info.plist',
    bundleIdentifier: process.env.EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER,
    buildNumber: process.env.EXPO_PUBLIC_APP_IOS_BUILD_NUMBER
  },
  android: {
    adaptiveIcon: {
      foregroundImage: `./assets/${process.env.EXPO_PUBLIC_APP_ANDROID_ICON}`,
      backgroundColor: process.env.EXPO_PUBLIC_APP_ANDROID_ICON_BACKGROUNDCOLOR
    },
    // googleServicesFile: './google-services.json',
    edgeToEdgeEnabled: true,
    package: process.env.EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER,
    versionCode: Number(process.env.EXPO_PUBLIC_APP_ANDROID_VERSION_CODE)
  },
  web: {
    favicon: `./assets/${process.env.EXPO_PUBLIC_APP_FAVICON}`
  },
  plugins: [
    ['./plugins/withNinjaLongPaths'],
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 26,
          compileSdkVersion: 35,
          targetSdkVersion: 35
        },
        ios: {
          useFrameworks: 'static'
        }
      }
    ]
    // [
    //   'expo-image-picker',
    //   {
    //     photosPermission: 'Allow $(PRODUCT_NAME) to access your photos',
    //     cameraPermissions: 'Allow $(PRODUCT_NAME) to access your camera'
    //   }
    // ],
    // [
    //   'expo-location',
    //   {
    //     locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.'
    //   }
    // ],
    // [
    //   'expo-splash-screen',
    //   {
    //     ios: {
    //       backgroundColor: process.env.EXPO_PUBLIC_APP_IOS_SPLASH_BACKGROUNDCOLOR,
    //       image: `./assets/images/${process.env.EXPO_PUBLIC_APP_SPLASH_IMAGE}`,
    //       imageWidth: Number(process.env.EXPO_PUBLIC_APP_IOS_SPLASH_IMAGE_WIDTH)
    //     },
    //     android: {
    //       backgroundColor: process.env.EXPO_PUBLIC_APP_ANDROID_SPLASH_BACKGROUNDCOLOR,
    //       image: `./assets/images/${process.env.EXPO_PUBLIC_APP_SPLASH_IMAGE}`,
    //       imageWidth: Number(process.env.EXPO_PUBLIC_APP_ANDROID_SPLASH_IMAGE_WIDTH)
    //     }
    //   }
    // ]
  ]
};
