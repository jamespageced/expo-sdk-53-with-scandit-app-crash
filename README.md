# Project Repo: expo-sdk-53-with-scandit-app-crash

Prerequisites and Setup/Run used with Windows 11 OS and android simulator

## Prerequisites

- git
- Visual Studio Code
- Nodejs (v24.13.0)
- java jdk version 17 minimum
- android studio similator

## Setup and Run Project

- Open powershell in the directory you want to clone the project
- Execute command: `git clone https://github.com/jamespageced/expo-camera-with-firebase-build-error.git`
- Execute command: `cd .\expo-camera-with-firebase-build-error\`
- select the branch("main", or "failure", or "success") to run the project with
  - stay on the main branch
  - or
  - Execute command: `git checkout failure`
  - or
  - Execute command: `git checkout success`
    - note: no solution is yet provided for the issue shown in the failure branch
- Execute command: `npm install`
- Execute command: `npm run dev-android`

### failure branch

***Note: This failure is only reproducable after the app is built into an .apk or .ipa. This failure does not reproduce on the android simulator in the development environment.***
***Note2: steps not included for ios, although the app is also crashing on ios devices***

**STEPS TO REPRODUCE ERROR**
1. Make sure you are on the failure branch.
2. replace the two variable values in the .env file
```
EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER="com.company.demo"
EXPO_PUBLIC_AMS_MOBILE_SCANDIT_LICENSE_KEY="<your scandit licence key>"
```
3. execute command: `npx expo prebuild --platform android --clean --npm`
4. use your own expo method to create the .apk file and install it on your mobile android device
5. open the app on your mobile device
6. Tap the button "TAP TO SCAN"
7. Watch it try to load the scandit screen and crash the app

### success branch

ToDo...
