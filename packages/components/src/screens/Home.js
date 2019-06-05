import React from 'react';
import { AsyncStorage, Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

HomeScreen.path = "";
HomeScreen.navigationOptions = {
  title: "Home",
  linkName: "Home Page"
};

export function HomeScreen({ navigation }) {
  const { navigate } = navigation;

  const _navigateToAboutScreen = () => {
    navigate('AboutScreen');
  };

  const _navigateToProfileScreen = (name) => {
    navigate('ProfileScreen', { name });
  };

  const _signOutAsync = async () => {
    await AsyncStorage.clear();
    navigate('LoginScreen');
  };

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>Home Page</Heading>
        <Button
          onPress={_navigateToAboutScreen}
          title='About'
        />
        <Button
          onPress={() => _navigateToProfileScreen('Jamie')}
          title="Go to Jamie's profile"
        />
        <Button
          onPress={() => _navigateToProfileScreen('Brent')}
          title="Go to Brent's profile"
        />
        <Button
          onPress={_signOutAsync}
          title='Sign Out'
        />
      </Flex>
    </Container>
  );
}
