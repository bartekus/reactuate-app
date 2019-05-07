import { View } from 'react-native';
import styled from 'styled-components';

const { vh, vw } = require('../utils/viewport');

export const Container = styled(View)`	
  padding-left: ${props => {
    if (props.full) return 0;
    return (((100*vw - 960) / 2) + 'px');
  }};
  
  padding-right: ${props => {
    if (props.full) return 0;
    return (((100*vw - 960) / 2) + 'px');
  }};
  
  padding-top: ${props => {
    if (props.fullVertical) return 0;
    if (props.small) return '15px';
    return '25px'
  }};
  
  padding-bottom: ${props => {
    if (props.fullVertical) return 0;
    if (props.small) return '15px';
    return '25px'
  }};
  
   min-height: ${props => {
    if (props.fullHorizontal) return 100*vh + 'px';
    return undefined;
  }};
`;
