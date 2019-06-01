import React from 'react';
import { Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

LoginScreen.path = '';
LoginScreen.navigationOptions = {
  title: 'Login',
  linkName: 'Login Page'
};

export function LoginScreen({ navigation: { navigate } }) {
  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>Login Screen</Heading>
        <Button
          onPress={() => navigate('HomeScreen')}
          title='Login'
        />
      </Flex>
    </Container>
  );
}
