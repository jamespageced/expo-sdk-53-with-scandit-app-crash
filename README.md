# Project Repo: expo-sdk-53-with-scandit-app-crash

Prerequisites and Setup/Run used with Windows 11 OS

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
- Execute command: `npm run dev-android` (for mac: `npm run dev-ios`)

### failure branch

**STEPS TO REPRODUCE ERROR**
1. Load the app in the similator (see "Setup and Run Project")
2. Tap the button "TAP TO SCAN"
3. Watch it try to load the scandit screen and crash the app

### success branch

ToDo...
