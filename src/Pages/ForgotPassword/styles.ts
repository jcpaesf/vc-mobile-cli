import { Dimensions, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');

export const ContainerTitle = styled.View`
    flex: 0.5;
    justify-content: center;
`;

export const ContainerForgotPassword = styled.View`
    flex: 1;
`;

export const ImageLogo = styled.Image`
    width: 48px;
    height: 30px;
    margin-bottom: 15px;
`;

export const TitleForgotPasswordBold = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: ${width <= 320 ? 19 : 21}px;
    color: #FFF;
`;

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
    font-family: 'RoundedMplus1c-Regular';
    font-size: ${width <= 320 ? 15 : 17}px;
    color: #FFF;
    text-align: center;
`;

export const TextEmail = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: ${width <= 320 ? 22 : 24}px;
    color: #FFF;
    margin-top: 30px;
    text-align: center;
`;

export const TextObs = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
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
    width: ${width - 50}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonLink = styled(BorderlessButton)`
    width: ${width - 50}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonForgotPasswordAndroid = styled(TouchableOpacity)`
    width: ${width - 50}px;
    height: 61px;
    border-radius: 30px;
    background: #FFF;
    justify-content: center;
    align-items: center;
`;

export const ButtonForgotPassword = styled(BorderlessButton)`
    width: ${width - 50}px;
    height: 61px;
    border-radius: 30px;
    background: #FFF;
    justify-content: center;
    align-items: center;
`;

export const TextLink = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;

export const TextForgotPassword = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #272727;
`;