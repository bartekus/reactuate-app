import { AppRegistry } from 'react-native';

import './index.css'

import App from '@reactuate/components/src/App';

AppRegistry.registerComponent('reactuate', () => App);

AppRegistry.runApplication('reactuate', {
  rootTag: document.getElementById('root'),
});
