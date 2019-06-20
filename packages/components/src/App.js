import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { createNavigator, StackRouter, SwitchRouter, SceneView } from "@react-navigation/core";

import { Header } from './organisms';
import { ApolloProvider } from "react-apollo";
import { useScreenSize } from './hooks/useScreenSize';
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { About, AuthLoading, Home, Login, Modal, Profile } from './screens';

import { makeClient } from "./apolloClient";

const client = makeClient();

export function AuthView(props) {
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

export function HomeView(props) {
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
      <Header
        onBack={navigation.goBack()}
        title={activeKey}
      />
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

export function ModalView(props) {
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
      <SceneView
        style={{
          flex: 1,
          backgroundColor: 'skyblue'
        }}
        component={descriptor.getComponent()}
        navigation={descriptor.navigation}
      />

    </SafeAreaView>
  );
}

export function AppView(props) {
  const { descriptors, navigation } = props;
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <SceneView
          component={descriptor.getComponent()}
          navigation={descriptor.navigation}
        />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

const AuthStack = createNavigator(
  AuthView,
  StackRouter({
    callback: AuthLoading,
    login: Login,
  }),
  {}
);

AuthStack.path = '';

const HomeStack = createNavigator(
  HomeView,
  SwitchRouter({
    Home,
    About,
    Profile
  }),
  {}
);
HomeStack.path = "";

const ModalStack = createNavigator(
  ModalView,
  SwitchRouter({
    Modal,
  }),
  {}
);
ModalStack.path = "";

const AppNavigator = createNavigator(
  AppView,
  SwitchRouter({
    callback: AuthStack,
    home: HomeStack,
    Modal: ModalStack,
  }),
  {
    initialRouteName: 'callback',
    mode: 'modal',
    headerMode: 'none',
  }
);

AppNavigator.path = '';

export default AppNavigator;
