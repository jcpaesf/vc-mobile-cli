import { Dimensions, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');

export const Background = styled.ImageBackground`
    flex: 1;
    align-items: center;
    padding: 25px;
`;

export const ViewLottie = styled.View`
    width: 100%;
    height: ${width <= 320 ? 180 : 200}px;
`;

export const TextConfirmEmail = styled.Text`
    font-family: 'MPLUSRounded1c-Regular';
    font-size: ${width <= 320 ? 15 : 17}px;
    color: #FFF;
    text-align: center;
`;

export const TextEmail = styled.Text`
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: ${width <= 320 ? 22 : 24}px;
    color: #FFF;
    margin-top: 30px;
    text-align: center;
`;

export const TextObs = styled.Text`
    font-family: 'MPLUSRounded1c-Regular';
    font-size: ${width <= 320 ? 15 : 17}px;
    color: #FFF;
    text-align: center;
    margin-top: 30px;
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

export const ButtonLinkAndroid = styled(TouchableOpacity)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonLink = styled(BorderlessButton)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonSignInAndroid = styled(TouchableOpacity)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #FFF;
    justify-content: center;
    align-items: center;
`;

export const ButtonSignIn = styled(BorderlessButton)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #FFF;
    justify-content: center;
    align-items: center;
`;

export const TextLink = styled.Text`
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;

export const TextSignIn = styled.Text`
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: 17px;
    color: #272727;
`;