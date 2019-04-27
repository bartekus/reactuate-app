import { AppRegistry } from 'react-native';

import App from 'components/src/App';

AppRegistry.registerComponent('reactuate', () => App);
AppRegistry.runApplication('reactuate', {
  rootTag: document.getElementById('root'),
});
