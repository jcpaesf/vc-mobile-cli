import { Dimensions, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

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
    width: ${width}px;
    height: 350px;
    background: red;
`;

export const TextScan = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 16px;
    color: #FFF;
    position: absolute;
    bottom: 50px;
`;

export const ContainerModal = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding-left: 10px;
    padding-right: 10px;
`;

export const ButtonCloseModalAndroid = styled(TouchableOpacity)`
    position: relative;
    left: 10px;
    bottom: 30px;
`;

export const ButtonCloseModal = styled(BorderlessButton)`
    position: relative;
    left: 10px;
    bottom: 30px;
`;

export const ContainerModalContent = styled.View`
    background: #FFF;
    width: 100%;
    align-items: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 5px;
`;

export const TextTitleModal = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: ${width <= 320 ? 18 : 20}px;
    color: #272727;
`;

export const TextAcess = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;

export const Image = styled.Image`
    width: 300px;
    height: 150px;
    border-radius: 15px;
`;

export const TextTypeCompleteModal = styled.Text`
    font-family: 'RoundedMplus1c-Medium';
    font-size: ${width <= 320 ? 16 : 18}px;
    color: #272727;
`;

export const TextDescriptionModal = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: ${width <= 320 ? 13 : 15}px;
    color: #272727;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const SubmitButton = styled(TouchableOpacity)`
    padding: 20px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const TextSubmitButton = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 15px;
    color: #FFF;
`;