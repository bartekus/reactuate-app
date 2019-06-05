import React from 'react';
import { AsyncStorage, Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

LoginScreen.path = 'login';
LoginScreen.navigationOptions = {
  title: 'Login',
  linkName: 'Login Page'
};

export function LoginScreen({ navigation: { navigate } }) {
  const _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    navigate('HomeScreen');
  };

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>Login Screen</Heading>
        <Button
          onPress={_signInAsync}
          title='Login'
        />
      </Flex>
    </Container>
  );
}
