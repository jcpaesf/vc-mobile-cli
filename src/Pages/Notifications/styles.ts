import { TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #0E0E0E;
    padding: 25px;
`;

export const TextTitle = styled.Text`
    font-family: 'MPLUSRounded1c-Black';
    font-size: 16px;
    color: #FFF;
    margin-top: 10px;
    margin-bottom: 10px;
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
    font-family: 'MPLUSRounded1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;