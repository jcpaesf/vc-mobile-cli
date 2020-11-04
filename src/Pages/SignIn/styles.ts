import { Dimensions, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Modal = styled.Modal`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TextModal = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 15px;
    color: #FFFFFF;
`;

export const Background = styled.ImageBackground`
    flex: 1;
    padding: 25px 25px 0px;
`;

export const ContainerTitle = styled.View`
    flex: 0.5;
    justify-content: center;
`;

export const ContainerSignIn = styled.View`
    flex: 1;
`;

export const ImageLogo = styled.Image`
    width: 48px;
    height: 30px;
    margin-bottom: 15px;
`;

export const TitleSignInBold = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: ${width <= 320 ? 19 : 21}px;
    color: #FFF;
`;

export const TextInput = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 16px;
    color: #FFF;
    margin-bottom: 5px;
`;

export const TextForgotPassword = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 12px;
    color: #FFF;
    text-decoration-line: underline;
`;

export const ButtonSignInAndroid = styled(TouchableOpacity)`
    width: 100%;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const ButtonSignIn = styled(BorderlessButton)`
    width: 100%;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const TextSignIn = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;

export const ContainerCredentials = styled(BorderlessButton)`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;

export const TextCredentials = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 14px;
    color: #FFF;
`;

export const TextCredentialsUnderline = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 14px;
    color: #FFF;
    text-decoration-line: underline;
`;