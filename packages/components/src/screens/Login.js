import React from 'react';
import { Alert, AsyncStorage, Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';
import { executeOAuth } from '../libs/oauth';

Login.path = 'login';
Login.navigationOptions = {
  title: 'Login',
  linkName: 'Login Page'
};

export function Login({ navigation }) {
  const { navigate } = navigation;

  const loginWithGitHub = async () => {
    try {
      const params = await executeOAuth('github');
      const { connectSid } = params;

      if (!connectSid) {
        throw new Error('No app connectSid');
      }

      await AsyncStorage.setItem('connectSid', connectSid);

      navigate('callback');

    } catch (error) {
      const description = 'OAuth execution failed';

      console.error(description, error);

      if (error.message === 'Canceled' || error.message === 'Timeout') return;

      Alert(`Login failed. ${error || ''}`);
    }
  };

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>Login Screen</Heading>
        <Button
          onPress={loginWithGitHub}
          title='Login'
        />
      </Flex>
    </Container>
  );
}
