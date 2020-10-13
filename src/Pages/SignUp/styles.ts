import { TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Background = styled.ImageBackground`
    flex: 1;
    padding: 25px;
`;

export const TextTitle = styled.Text`
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: 19px;
    color: #FFF;
    margin-bottom: 25px;
`;

export const ButtonSignUpAndroid = styled(TouchableOpacity)`
    width: 100%;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const ButtonSignUp = styled(BorderlessButton)`
    width: 100%;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const TextSignUp = styled.Text`
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;
