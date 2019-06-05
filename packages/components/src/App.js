import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { createNavigator, SwitchRouter, SceneView } from "@react-navigation/core";

import { useScreenSize } from './hooks/useScreenSize';
import { AboutScreen, AuthLoadingScreen, HomeScreen, LoginScreen, ProfileScreen } from './screens';

export function AuthView(props) {
  const { descriptors, navigation } = props;
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

  return (
    <SceneView
      component={descriptor.getComponent()}
      navigation={descriptor.navigation}
    />
  );
}

export function HomeView(props) {
  const { descriptors, navigation } = props;
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

  return (
    <SceneView
      component={descriptor.getComponent()}
      navigation={descriptor.navigation}
    />
  );
}

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

const AuthStack = createNavigator(
  AuthView,
  SwitchRouter({
    LoginScreen,
  }),
  {}
);

const HomeStack = createNavigator(
  HomeView,
  SwitchRouter({
    HomeScreen,
    AboutScreen,
    ProfileScreen
  }),
  {}
);

HomeStack.path = "";

const AppNavigator = createNavigator(
  AppView,
  SwitchRouter({
    AuthLoading: AuthLoadingScreen,
    App: HomeStack,
    Auth: AuthStack,
  }),
  {
    initialRouteName: 'AuthLoading',
  }
);

AppNavigator.path = 'login';

export default AppNavigator;
