import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { createNavigator, SwitchRouter, SceneView } from "@react-navigation/core";

import { useScreenSize } from './hooks/useScreenSize';
import { AboutScreen, HomeScreen, LoginScreen, ProfileScreen } from './screens';

export function AppView(props) {
  const size = useScreenSize();
  const { width, height } = size;

  const { descriptors, navigation } = props;
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

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


    </SafeAreaView>
  );
}

const AppNavigator = createNavigator(
  AppView,
  SwitchRouter({
    HomeScreen,
    AboutScreen,
    ProfileScreen
  }),
  {}
);

export default AppNavigator;
