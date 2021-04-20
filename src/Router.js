import React from 'react';
import '@babel/polyfill';
import { NavigationActions, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import * as Views from './components/views';
import { colors } from './common/styles';

//TestSquarePhoto CameraViewFit CameraView TestText2Speech ZIndexTest, VideoMixer RNDrag SVGText SVGTest VideoPlay, 
//MediaFolderView, CameraView // CreateJoinVideo //DeApps //Login //UserProfile VideoScreen CommandScreen
// 
//VideoUploadInfoView EntryMain TestPhotoEditor Login
export const INITIAL_ROUTE = 'Login'; 

const navigator = createStackNavigator({
    EntryMain: { screen: Views.EntryMain },
    WalletsOverview: {screen: Views.WalletsOverview},
    ShareData: {screen: Views.ShareData},
    Login: {screen: Views.Login},
    AppKeyView: {screen: Views.AppKeyView},
    AddContacts: {screen: Views.AddContacts},
    MobileContacts: {screen: Views.MobileContacts},
    ShareRequestCategory: {screen: Views.ShareRequestCategory},
    ShareAction:  {screen: Views.ShareAction},
    ShareActionConfirm: {screen: Views.ShareActionConfirm},
    UploadAction: {screen: Views.UploadAction},
    UploadCategory: {screen: Views.UploadCategory},
    ForgotPassword: {screen: Views.ForgotPassword},
    LegalModal: {screen: Views.LegalModal},
    MedicalShareHistory: {screen: Views.MedicalShareHistory},
    VerifyPin: {screen: Views.VerifyPin},
    ScanMe: {screen: Views.ScanMe},  
    AppKeyRequestAction: {screen: Views.AppKeyRequestAction},  
    AppKeyRequest: {screen: Views.AppKeyRequest},
    VerifyPinResetPWD: {screen: Views.VerifyPinResetPWD},
}, {
    initialRouteName: INITIAL_ROUTE,
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary,
        tintColor: colors.secondary
    }
});
const App = createAppContainer(navigator);

const parentGetStateForAction = navigator.router.getStateForAction;

navigator.router.getStateForAction = (action, inputState) => {
    const state = parentGetStateForAction(action, inputState);

    // fix it up if applicable
    if (state && action.type === NavigationActions.NAVIGATE) {
        if (action.params && action.params.replaceRoute) {
            const leave = action.params.leave || 1;
            delete action.params.replaceRoute;
            while (state.routes.length > leave && state.index > 0) {
                const oldIndex = state.index - 1;
                // remove one that we are replacing
                state.routes.splice(oldIndex, 1);
                // index now one less
                state.index = oldIndex;
            }
        }
    }

    return state;
};




export default App;
