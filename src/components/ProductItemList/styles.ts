import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

interface ContainerItemProps {
    background: string;
}

export const ContainerItem = styled.View<ContainerItemProps>`
    width: ${width - 50}px;
    height: 150px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: 5px 10px 20px ${props => props.background};
    flex-direction: row;

    ${props => `background-color: ${props.background};`}
`;

export const ContainerContent = styled.View`
    flex: 1;
    padding: 10px;
`;

export const ImageProduct = styled.Image`
    height: 150px;
    width: ${width / 3}px;
`;

export const TextTitleList = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 15px;
    color: #FFF;
`;

export const TextTypeProductList = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 15px;
    color: #FFF;
`;

export const ContainerContentProduct = styled.View`
    flex: 1;
    justify-content: center;
`;

export const TextContent = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 9px;
    color: #FFF;
`;

export const TextValidate = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 8px;
    color: #FFF;
`;

export const TextDate = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 8px;
    color: #FFF;
`;

export const ContainerNotification = styled.View`
    position: absolute;
    right: 10px;
    top: 10px;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #D03434;
`;

export const ContainerContentData = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TextNotification = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 11px;
    color: #FFF;
`;

export const ButtonAccess = styled(BorderlessButton)`
    flex: 0.3;
    justify-content: center;
    align-items: center;
`;