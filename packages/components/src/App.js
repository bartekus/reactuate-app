import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dimensions, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { scale, verticalScale, moderateScale } from './utils/scaling';
import { Container, Flex, Heading } from './atoms';

const { vh } = require('./utils/viewport');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

function useWindowSize() {
  function getSize() {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    Dimensions.addEventListener('change', handleResize);

    return () => Dimensions.removeEventListener('change', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default function App() {
  const size = useWindowSize();
  const { width, height } = size;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'powderblue',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}
    >
      <Header style={{
        height: 50,
        backgroundColor: 'powderblue'
      }}>

      </Header>

      <ScrollView style={{
        flex: 1,
        backgroundColor: 'skyblue'
      }} >

        <Container full fullVertical fullHorizontal>
          <Main>
            <Flex alignCenter justifyCenter column flex1>

              <Box>
                <Flex alignStretch justifyBetween column flex1>

                  <Flex alignCenter column>
                    <Heading><Title>Welcome to</Title></Heading>
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
                    <Text>Width: {width}</Text>
                    <Text>Height: {height}</Text>
                    <Heading h5><Note>{instructions}</Note></Heading>
                  </Flex>

                </Flex>
              </Box>

            </Flex>
          </Main>
        </Container>
      </ScrollView>

    </SafeAreaView>
  );
}

const Header = styled(View)`
	width: 100%;
	height: ${8*vh}px;
	background-color: powderblue;
`;

const Main = styled(View)`
	width: 100%;
	height: ${84*vh}px;
`;

const Box = styled(View)`
  flex: 1;
	width: ${moderateScale(320)}px;
	height: ${verticalScale(460)}px;
	padding: ${scale(10)}px;
	background-color: skyblue;
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
