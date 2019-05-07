import React from 'react';
import styled from 'styled-components';
import { Platform, Text, View } from 'react-native';

import { Container, Flex } from './atoms';

const { vh } = require('./utils/viewport');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  render() {
    return (
      <Container full fullVertical fullHorizontal>

        <Header />

        <Main>
          <Flex alignCenter justifyCenter column flex1>

              <Title>Welcome to React Native Web</Title>
              <Subtitle>with 💅 Styled Components</Subtitle>

              <Note>This component is being shared between iOS, Android & Web</Note>
              <Note>{instructions}</Note>

          </Flex>
        </Main>

        <Footer />

      </Container>
    );
  }
}

const Header = styled(View)`
	width: 100%;
	height: ${10*vh}px;
	background-color: powderblue;
`;

const Main = styled(View)`
	width: 100%;
	height: ${80*vh}px;
	background-color: skyblue;
`;

const Footer = styled(View)`
	width: 100%;
	height: ${10*vh}px;
	background-color: steelblue;
`;

const Title = styled(Text)`
	font-size: 24px;
	font-weight: 500;
	color: palevioletred;
`;

const Subtitle = styled(Text)`
	font-size: 18px;
	font-weight: 400;
	color: purple;
	margin-bottom: 55px;
`;

const Note = styled(Text)`
	font-size: 16px;
	font-weight: 300;
	color: forestgreen;
	margin-bottom: 55px;
	text-align: center;
`;
