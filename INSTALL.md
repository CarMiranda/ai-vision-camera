# Install Android SDK + dependencies
sudo apt update
sudo apt install -y cmake ninja java-17-jre java-17-jdk

export ANDROID_HOME=/usr/lib/android-sdk
export PATH="${PATH}:${ANDROID_HOME}/tools/:${ANDROID_HOME}/platform-tools/"

/usr/lib/android-sdk/cmdline-tools/latest/bin/sdkmanager install 'platforms;android-34' 'build-tools;34.0.0' 'ndk;25.1.8937393'
/usr/lib/android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses --sdk_root ${ANDROID_HOME}

# Install module dependencies

From [here](https://docs.expo.dev/bare/installing-expo-modules):
```
npx install install-expo-module@latest
```

# Run in dev mode

- Plug your phone (vision-camera does not work on web)
- Run `npx expo run:android`

If your phone is still not usable, go to 'Developer options' > 'Revoke USB debugging authorizations' and replug your phone. It should now ask whether to allow your computer to use it for debugging. 

If you get an error about `minSdkVersion`, change the value in either the `android/build.gradle` file or `app.json`.

# Run in prod mode
Login to your expo account to deploy the app: 
```
npm install -g eas-cli
eas login
```

