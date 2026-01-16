import Constants from 'expo-constants';

type NavScreen = { route: string; title: string };

type NavScreens = {
  home: NavScreen;
  simpleScandit: NavScreen;
};

export const navRoutesToTitles: any = {
  home: Constants.expoConfig?.name ?? 'unknown',
  'simple-scandit': ''
};

export const navScreens: NavScreens = {
  home: { route: 'home', title: 'Home' },
  simpleScandit: { route: 'simple-scandit', title: '' }
};
