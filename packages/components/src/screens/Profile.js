import React from 'react';
import { Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

ProfileScreen.path = 'person/:name';
ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name'),
  linkName: 'Profile Page'
});

export function ProfileScreen({ navigation }) {
  const { getParam, navigate } = navigation;

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>{ getParam('name') }'s Profile</Heading>
        <Button
          onPress={() => navigate('HomeScreen')}
          title='Go Home'
        />
      </Flex>
    </Container>
  );
}
