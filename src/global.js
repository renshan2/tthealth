import LocalizedStrings from 'react-native-localization';
import { Languages } from './common/constants/languages';
//import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from "react-native-localize";

        

let locales  = RNLocalize.getLocales();
//if(__DEV__){
    //console.log("Locales: ", locales); 
    //console.log("languageAvail: ", RNLocalize.findBestAvailableLanguage(["en-US", "en","zh-CN","zh", "fr"]));
//}

//const locales = RNLocalize.getLocales();
//const languageAvail = RNLocalize.findBestAvailableLanguage(["en-US", "en","zh"]);
//console.log("languageAvail: ", languageAvail); 
//const deviceLocale = DeviceInfo.getDeviceLocale();
/*
[ { isRTL: false,
    languageCode: 'en',
    languageTag: 'en-US',
    countryCode: 'US' },
  { isRTL: false,
    languageCode: 'zh',
    scriptCode: 'Hans',
    languageTag: 'zh-Hans-US',
    countryCode: 'US' } ]*/

global.langStrings = new LocalizedStrings(Languages);
//console.log("global.langStrings: ", global.langStrings); 
 
/*
    let deviceLanguage = Platform.OS === 'ios' ? 
        NativeModules.SettingsManager.settings.AppleLocale:
        NativeModules.I18nManager.localeIdentifier;

        console.log("deviceLanguage: ", deviceLanguage); 

    if (deviceLanguage === undefined) {
        // iOS 13 workaround, take first of AppleLanguages array 
        deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0]
        if (deviceLanguage == undefined) {
            deviceLanguage = "en" // default language
        }
    }
    */
    //console.log("deviceLanguage: ", deviceLanguage); 
    if(locales && locales.length>0 && locales[0].languageCode=="zh")
        global.lang = "zh";
    else global.lang = "en";
    global.langStrings.setLanguage(global.lang);
//}
//if(__DEV__)
//console.log("global.lang: ", global.lang); 
////let countryCode = RNLocalize.getCountry();
//console.log("countryCode: ", countryCode); 