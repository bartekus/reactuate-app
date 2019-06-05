import React from 'react';
import { Button } from "react-native";

import { Container, Flex, Heading } from '../atoms';

About.path = "about";
About.navigationOptions = {
  title: "About",
  linkName: "About Page"
};

export function About({ navigation }) {
  const { navigate } = navigation;

  return (
    <Container full fullVertical fullHorizontal>
      <Flex alignCenter column>
        <Heading>About Page</Heading>
        <Button
          onPress={() => navigate('Home')}
          title='Go Home'
        />
      </Flex>
    </Container>
  );
}
