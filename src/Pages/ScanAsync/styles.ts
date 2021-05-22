import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

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
    width: 100%;
    height: ${width <= 320 ? 220 : 260}px;
`;

export const TextScan = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 16px;
    color: #FFF;
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

export const ButtonManualAndroid = styled(TouchableOpacity)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 0px;
    justify-content: center;
    align-items: center;
    margin-top: 11px;
`;

export const ButtonManual = styled(BorderlessButton)`
    width: ${width - 25}px;
    height: 61px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 0px;
    justify-content: center;
    align-items: center;
    margin-top: 11px;
`;

export const TextManual = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
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

export const ButtonAccessModalAndroid = styled(TouchableOpacity)`
    width: ${width <= 320 ? 200 : 252}px;
    height: ${width <= 320 ? 51 : 61}px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const ButtonAccessModal = styled(BorderlessButton)`
    width: ${width <= 320 ? 200 : 252}px;
    height: ${width <= 320 ? 51 : 61}px;
    border-radius: 30px;
    background: #272727;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const TextAcess = styled.Text`
    font-family: 'RoundedMplus1c-ExtraBold';
    font-size: 17px;
    color: #FFF;
`;

export const Image = styled.Image`
    width: 200px;
    height: 150px;
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