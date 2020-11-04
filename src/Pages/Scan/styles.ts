import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Background = styled.ImageBackground`
    flex: 1;
    padding: 25px;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ViewLottie = styled.View`
    width: ${width}px;
    height: 350px;
    background: red;
`;

export const TextScan = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 16px;
    color: #FFF;
    position: absolute;
    bottom: 50px;
`;