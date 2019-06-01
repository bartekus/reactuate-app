import React from 'react';
import { Button } from "react-native";

import { Container, Flex, Heading } from '../atoms';

AboutScreen.path = "about";
AboutScreen.navigationOptions = {
  title: "About",
  linkName: "About Page"
};

export function AboutScreen({ navigation }) {
  const { navigate } = navigation;

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>About Page</Heading>
        <Button
          onPress={() => navigate('HomeScreen')}
          title='Go Home'
        />
      </Flex>
    </Container>
  );
}
