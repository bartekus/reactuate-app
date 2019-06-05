import React from 'react';
import { Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

Profile.path = 'person/:name';
Profile.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name'),
  linkName: 'Profile Page'
});

export function Profile({ navigation }) {
  const { getParam, navigate } = navigation;

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>{ getParam('name') }'s Profile</Heading>
        <Button
          onPress={() => navigate('Home')}
          title='Go Home'
        />
      </Flex>
    </Container>
  );
}
