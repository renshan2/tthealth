install android studio (separate installation)
set up environment variable JAVA_HOME to point to android studio jre path
create a working folder
npm install -g react-native-cli
npm install -g expo-cli
git clone https://github.com/ttdata/mobile1.git
cd mobile1
npm cache clean --force
npm install graceful-fs --save-dev
# for release
npm install
# npm install --save-dev jetifier
follow android studio update prompt also 
# for android
react-native start
react-native run-android
# for ios
react-native run-ios 