import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

export class AuthLoading extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const connectSid = await AsyncStorage.getItem('connectSid');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(connectSid ? 'home' : 'login');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
