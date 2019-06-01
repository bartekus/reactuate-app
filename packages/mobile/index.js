/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer } from '@react-navigation/native';

import AppNavigator from '@reactuate/components/src/App';
import { name as appName  } from './app.json';

const App = createAppContainer(AppNavigator);

useScreens();

AppRegistry.registerComponent(appName, () => App);
