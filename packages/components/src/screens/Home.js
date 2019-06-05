import React from 'react';
import { AsyncStorage, Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

Home.path = "";
Home.navigationOptions = ({ navigation }) => ({
  title: "Home",
  linkName: "Home Page",
  headerLeft: (
    <Button
      onPress={() => navigation.navigate('Modal')}
      title="Info"
      color="#fff"
    />
  ),
});

export function Home({ navigation }) {
  const { navigate } = navigation;

  const _navigateToAbout = () => {
    navigate('About');
  };

  const _navigateToProfile = (name) => {
    navigate('Profile', { name });
  };

  const _openModal = () => {
    navigate('Modal');
  };

  const _signOutAsync = async () => {
    await AsyncStorage.clear();
    navigate('Login');
  };

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>Home Page</Heading>
        <Button
          onPress={_navigateToAbout}
          title='About'
        />
        <Button
          onPress={() => _navigateToProfile('Jamie')}
          title="Go to Jamie's profile"
        />
        <Button
          onPress={() => _navigateToProfile('Brent')}
          title="Go to Brent's profile"
        />
        <Button
          onPress={_openModal}
          title='Info'
        />
        <Button
          onPress={_signOutAsync}
          title='Sign Out'
        />
      </Flex>
    </Container>
  );
}
