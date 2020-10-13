import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export const Container = styled.View`
    flex: 1;
    background: #0E0E0E;
    padding: 25px 25px 0px 25px;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 25px;
    padding-bottom: 15px;
    border-bottom-width: 1px;
    border-bottom-color: rgba(255, 255, 255, 0.25);
`;

export const ContainerAvatar = styled.View`
    width: 79px;
    height: 79px;
    border-radius: 39.5px;
`;

export const Avatar = styled.Image`
    width: 79px;
    height: 79px;
    border-radius: 39.5px;
`;

export const ButtonAvatarAndroid = styled(TouchableOpacity)`
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
`;

export const ButtonAvatar = styled(BorderlessButton)`
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
`;

export const ContainerUser = styled.View`
    margin-left: 10px;
    justify-content: center;
`;

export const TextNameUser = styled.Text`
    font-family: 'MPLUSRounded1c-Black';
    font-size: ${width <= 320 ? 14 : 16}px;
    color: #FFF;
`;

export const TextEmailUser = styled.Text`
    font-family: 'MPLUSRounded1c-Regular';
    font-size: ${width <= 320 ? 12 : 13}px;
    color: #FFF;
`;

export const TextConfig = styled.Text`
    font-family: 'MPLUSRounded1c-Black';
    font-size: 19px;
    color: #FFF;
    margin-top: 15px;
`;

export const ContainerOptions = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
    margin-left: 10px;
`;

export const TextOption = styled.Text`
    font-family: 'MPLUSRounded1c-Medium';
    font-size: 15px;
    color: #FFF;
    margin-left: 10px;
`;