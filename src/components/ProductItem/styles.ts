import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const ContainerContent = styled(Animated.View)`
    width: 95%;
    height: 100%;
    background: #FFF;
    align-items: center;
    margin-top: 5px;
    padding-top: 10px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
`;

export const ContainerImg = styled.View`
    flex: 1.5;
    width: 95%;
`;

export const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

export const ContainerProduct = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TextProduct = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 14px;
    color: #272727;
`;

export const TextTypeProduct = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 17px;
    color: #272727;
`;

export const TextContent = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 11px;
    color: #272727;
    text-align: center;
`;

export const TextValidate = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 10px;
    color: #272727;
    text-align: center;
`;

export const TextDate = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 13px;
    color: #272727;
`;

export const ContainerButton = styled.View`
    position: relative;
    bottom: 0;
    width: 220px;
    padding: 0px 5px;
`;

export const ButtonAccess = styled(BorderlessButton)`
    width: 100%;
    height: 55px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

export const TextAcess = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;