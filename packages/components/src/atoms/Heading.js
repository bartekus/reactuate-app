import React from 'react';
import { Text } from 'react-native';
import styled, { css } from 'styled-components';

import { scale, verticalScale, moderateScale } from '../utils/scaling';

const baseStyle = css`
    color: #202020;
    margin-bottom: ${scale(10)};

    text-align: ${props => {
        if (props.center) return 'center';
        if (props.right) return 'right';
        return 'left'
    }};

    margin-top: 0;
    max-width: 100%;
    font-weight: 600;
`;

const HeadingOne = styled(Text)`
    font-size: ${moderateScale(42, 0.4)}px;
    font-weight: 700;
    margin-bottom: ${verticalScale(25)}px;
    ${baseStyle};
`;

const HeadingTwo = styled(Text)`
    font-size: ${moderateScale(36, 0.3)}px;
    font-weight: bold;
    margin-bottom: ${verticalScale(20)}px;
    ${baseStyle};
`;

const HeadingThree = styled(Text)`
    font-size: ${moderateScale(28, 0.2)}px;
    font-weight: normal;
    margin-bottom: 1 ${verticalScale(15)}px;
    ${baseStyle};
`;

const HeadingFour = styled(Text)`
    font-size: ${moderateScale(22, 0.2)}px;
    font-weight: 200;
    margin-bottom: ${verticalScale(10)}px;
    ${baseStyle};
`;

const HeadingFive = styled(Text)`
    font-size: ${moderateScale(18, 0.1)}px;
    font-weight: 100;
    margin-bottom: ${verticalScale(5)}px;
    ${baseStyle};
`;

export const Heading = ({ h2, h3, h4, h5, noMargin, right, center, ...props }) => {
    if (h2) return <HeadingTwo noMargin={noMargin} right={right} center={center} {...props} />;
    if (h3) return <HeadingThree noMargin={noMargin} right={right} center={center} {...props} />;
    if (h4) return <HeadingFour noMargin={noMargin} right={right} center={center} {...props} />;
    if (h5) return <HeadingFive noMargin={noMargin} right={right} center={center} {...props} />;
    return <HeadingOne noMargin={noMargin} right={right} center={center} {...props} />
};
