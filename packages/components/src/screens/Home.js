import React from 'react';
import { Button } from 'react-native';

import { Container, Flex, Heading } from '../atoms';

HomeScreen.path = "";
HomeScreen.navigationOptions = {
  title: "Home",
  linkName: "Home Page"
};

export function HomeScreen({ navigation }) {
  const { navigate } = navigation;

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>Home Page</Heading>
        <Button
          onPress={() => navigate('AboutScreen')}
          title='About'
        />
        <Button
          onPress={() => navigate('ProfileScreen', { name: 'Jamie' })}
          title="Go to Jamie's profile"
        />

        <Button
          onPress={() => navigate('ProfileScreen', { name: 'Brent' })}
          title="Go to Brent's profile"
        />
      </Flex>
    </Container>
  );
}
