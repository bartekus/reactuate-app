import React from 'react';
import { AsyncStorage, Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

Modal.path = "";
Modal.navigationOptions = {
  title: "Modal",
  linkName: "Modal Page"
};

export function Modal({ navigation }) {
  const { navigate } = navigation;

  const _navigateBack = () => {
    navigate('Home');
  };

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>This is a modal!</Heading>
        <Button
          onPress={_navigateBack}
          title='Dismiss'
        />
      </Flex>
    </Container>
  );
}
