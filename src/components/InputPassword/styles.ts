import styled, { css } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

interface TextInputProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<TextInputProps>`
    width: 100%;
    height: 50px;
    padding: 0 16px;
    background: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: #0e0e0e;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
            opacity: 1;
        `
    }
`;

export const TextInputVs = styled.TextInput`
    width: 92%;
    color: #0e0e0e;
    height: 50px;
    font-size: 16px;
    font-family: 'RoundedMplus1c-Regular';
`;

export const Icon = styled(Feather)`
    margin-right: 5px;
`;