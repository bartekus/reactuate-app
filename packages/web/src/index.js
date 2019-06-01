import { AppRegistry } from 'react-native';
import { createBrowserApp } from "@react-navigation/web";

import './index.css'

import AppNavigator from '@reactuate/components/src/App';

const App = createBrowserApp(AppNavigator);

AppRegistry.registerComponent('reactuate', () => App);

AppRegistry.runApplication('reactuate', {
  rootTag: document.getElementById('root'),
});
