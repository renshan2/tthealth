/**
 * @format
 */

import {AppRegistry} from 'react-native';
import './src/common/utils/shims';
import App from './src';
import {name as appName} from './app.json';
//import '@babel/polyfill';

AppRegistry.registerComponent(appName, () => App);
