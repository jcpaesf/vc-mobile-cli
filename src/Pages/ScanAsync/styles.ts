import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

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
    width: 100%;
    height: ${width <= 320 ? 220 : 260}px;
`;

export const TextScan = styled.Text`
    font-family: 'MPLUSRounded1c-Regular';
    font-size: 16px;
    color: #FFF;
`;

export const ContainerButton = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    padding: 16px 0 ${30 + getBottomSpace()}px;
`;

export const ButtonManualAndroid = styled(TouchableOpacity)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 0px;
    justify-content: center;
    align-items: center;
    margin-top: 11px;
`;

export const ButtonManual = styled(BorderlessButton)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 0px;
    justify-content: center;
    align-items: center;
    margin-top: 11px;
`;

export const TextManual = styled.Text`
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;