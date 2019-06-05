import React from 'react';
import styled from 'styled-components';
import { Button, SafeAreaView, Text, View } from 'react-native';

import { Container } from '../atoms';

const StyledHeaderContainer = styled(SafeAreaView)`
    display: flex;
`;

const StyledHeader = styled(View)`
    padding: 5px;
    align-items: center;
    flex-direction: row;
    min-height: 50px;
`;

const StyledHeaderCenter = styled(View)`
    flex: 1;
    
`;

const StyledHeaderLeft = styled(View)`
    
    width: 80px;
`;

const StyledHeaderRight = styled(View)`
    
    width: 80px;
`;

const StyledTitle = styled(Text)`
    font-size: 19px;
    font-weight: 600;
    text-align: center;
`;

export const Header = ({ onBack, title }) => {
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <StyledHeaderCenter
          style={{
            order: 2,
          }}
        >
          <StyledTitle accessibilityRole="none" aria-level="3">
            { title }
          </StyledTitle>
        </StyledHeaderCenter>
        {
          onBack ? (
            <React.Fragment>
              <StyledHeaderLeft
                style={{
                  order: 1,
                }}
              >
                <Button title="Back" onPress={onBack} />
              </StyledHeaderLeft>
              <StyledHeaderRight
                style={{
                  order: 3,
                }}
              >
              </StyledHeaderRight>
            </React.Fragment>
          ) : null
        }
      </StyledHeader>
    </StyledHeaderContainer>
  )
};
