import { BorderlessButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface SelectedItem {
    notification: boolean;
}

export const ProductItem = styled(BorderlessButton)`
    flex: 0.5;
    margin: 5px;
    height: 230px;
`;

export const ContainerSelect = styled.View<SelectedItem>`
    position: absolute;
    left: 10px;
    top: 5px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #000;
    opacity: 0;
    align-items: center;
    justify-content: center;

    ${(props) =>
        props.notification &&
        css`
            opacity: 1
        `
    }
`;