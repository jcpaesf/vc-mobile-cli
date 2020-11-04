import { TouchableOpacity, Dimensions } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');

export const Background = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    padding: 25px 25px 0px;
`;

export const ImageLogo = styled.Image`
    width: 48px;
    height: 30px;
    margin-bottom: 40px;
`;

export const TitleWelcome = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: ${width <= 320 ? 21 : 23}px;
    color: white;
`;

export const TitleWelcomeBold = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: ${width <= 320 ? 21 : 23}px;
    color: white;
`;

export const SubTitle = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: ${width <= 320 ? 12 : 14}px;
    color: white;
    margin-top: 10px;
    margin-bottom: 200px;
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

export const ButtonSignInAndroid = styled(TouchableOpacity)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonSignIn = styled(BorderlessButton)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonScanAndroid = styled(TouchableOpacity)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #FFF;
    justify-content: center;
    align-items: center;
`;

export const ButtonScan = styled(BorderlessButton)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #FFF;
    justify-content: center;
    align-items: center;
`;

export const TextSignIn = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;

export const TextScan = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #272727;
`;