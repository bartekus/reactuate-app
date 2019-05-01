import { View } from 'react-native';
import styled from 'styled-components';

const { vw } = require('../utils/viewport');

const Container = styled(View)`
  flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: papayawhip;
	
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
`;

export default Container;
