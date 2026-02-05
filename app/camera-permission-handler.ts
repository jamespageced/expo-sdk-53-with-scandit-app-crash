import { PermissionsAndroid, Platform } from 'react-native';

const isAndroidMarshmallowOrNewer = Platform.OS === 'android' && Platform.Version >= 23;

export const checkCameraPermissions = async () => {
  if (isAndroidMarshmallowOrNewer) {
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  } else {
    return true;
  }
};

export const requestCameraPermissions = async () => {
  if (isAndroidMarshmallowOrNewer) {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return Promise.resolve(true);
      } else {
        throw new Error('Android Camera Permission has been denied.');
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  } else {
    return Promise.resolve(true);
  }
};

export const requestCameraPermissionsIfNeeded = async (): Promise<boolean> => {
  try {
    const hasPermissions = await checkCameraPermissions();
    if (!hasPermissions) {
      const results = await requestCameraPermissions();
      return results;
    } else {
      return true;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};
