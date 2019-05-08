import React from 'react';
import styled from 'styled-components';
import { Platform, Text, View } from 'react-native';

import { scale, verticalScale, moderateScale } from './utils/scaling';
import { Container, Flex, Heading } from './atoms';

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

            <Box>
              <Flex alignStretch justifyBetween column flex1>

                <Flex alignCenter column>
                  <Heading h1><Title>Welcome to</Title></Heading>
                  <Heading h2><Subtitle>React Native Web</Subtitle></Heading>
                </Flex>

                <Flex alignCenter column>
                  <Heading h5><Note>The template includes</Note></Heading>
                  <Heading h3><Subtitle> 💅 Styled Components</Subtitle></Heading>
                </Flex>

                <Flex column>
                  <Heading h5><Info>This component is shared between</Info></Heading>

                  <Heading h4><Title>🖥️ Desktop</Title></Heading>
                  <Heading h4><Title>📱 Mobile ( iOS & Android )</Title></Heading>
                  <Heading h4><Title>💻 Web</Title></Heading>
                </Flex>

                <Flex alignCenter justifyEnd column>
                  <Heading h5><Note>{instructions}</Note></Heading>
                </Flex>

              </Flex>
            </Box>

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
	background-color: darkcyan;
`;

const Box = styled(View)`
  flex: 1;
	width: ${moderateScale(320)}px;
	height: ${verticalScale(460)}px;
	padding: ${scale(10)}px;
	background-color: skyblue;

	border-radius: ${1/4};
`;

const Footer = styled(View)`
	width: 100%;
	height: ${10*vh}px;
	background-color: steelblue;
`;

const Title = styled(Text)`
	color: palevioletred;
`;

const Subtitle = styled(Text)`
	color: purple;
`;

const Info = styled(Text)`
	color: steelblue;
	text-align: left;
`;

const Note = styled(Text)`
	color: forestgreen;
	text-align: center;
`;
