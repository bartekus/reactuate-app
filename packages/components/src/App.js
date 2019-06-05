import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { createNavigator, SwitchRouter, SceneView } from "@react-navigation/core";

import { useScreenSize } from './hooks/useScreenSize';
import { AboutScreen, HomeScreen, LoginScreen, ProfileScreen } from './screens';

export function AppView(props) {
  const size = useScreenSize();
  const { width, height } = size;

  const { descriptors, navigation } = props;
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

  // console.log('descriptor: ', descriptor);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'powderblue',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}
    >
      <ScrollView style={{
        flex: 1,
        backgroundColor: 'skyblue'
      }} >

        <SceneView
          component={descriptor.getComponent()}
          navigation={descriptor.navigation}
        />

      </ScrollView>

      <View>
        <Text>width: {width}</Text>
        <Text>height: {height}</Text>
      </View>

    </SafeAreaView>
  );
}

const HomeNavigator = createNavigator(
  AppView,
  SwitchRouter({
    HomeScreen,
    AboutScreen,
    ProfileScreen
  }),
  {}
);

HomeNavigator.path = "";

const AppNavigator = createNavigator(
  AppView,
  SwitchRouter({
    LoginScreen,
    HomeNavigator
  }),
  {}
);

AppNavigator.path = 'login';

export default AppNavigator;
