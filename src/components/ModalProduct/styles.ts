import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

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
`;

export const ContainerRow = styled.View`
    flex-direction: row;
    margin-top: 15px;
    justify-content: center;
    flex-wrap: wrap;
`;

export const TagProduct = styled.View`
    width: 88px;
    height: 25px;
    border: 1px solid #000;
    border-radius: 30px;
    background: #FFF;
    margin-top: 4px;
    margin-right: 4px;
    align-items: center;
    justify-content: center;
`;

export const TextTag = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 10px;
    color: #272727;
`;

export const ContainerContentModal = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 270px;
    margin-top: 20px;
    align-items: center;
`;

export const TextDateModal = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: ${width <= 320 ? 10 : 11}px;
    color: #272727;
    text-align: center;
`;

export const TextContentModal = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: ${width <= 320 ? 12 : 13}px;
    color: #272727;
`;

export const TextValidateModal = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 10px;
    color: #272727;
    text-align: center;
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