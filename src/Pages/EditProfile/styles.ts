import { TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #0E0E0E;
    padding: 25px;
`;

export const TextConfig = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 19px;
    color: #FFF;
    margin-top: 30px;
`;

export const ContainerEmail = styled.View`
    margin-top: 25px;
`;

export const ContainerPassword = styled.View`
    justify-content: flex-end;
    flex: 1;
    margin-top: 50px;
`;

export const ButtonEditProfileAndroid = styled(TouchableOpacity)`
    width: 100%;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const ButtonEditProfile = styled(BorderlessButton)`
    width: 100%;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const TextEditProfile = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;