import styled, { css } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

interface TextInputProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<TextInputProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: #FFFFFF;
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

    ${(props) =>
        (!props.isFocused && !props.isErrored) &&
        css`
            opacity: 0.3;
        `
    }
`;

export const TextInputVs = styled.TextInput`
    width: 92%;
    color: #FFF;
    height: 60px;
    font-size: 16px;
    font-family: 'RoundedMplus1c-Regular';
`;

export const Icon = styled(Feather)`
    margin-right: 20px;
`;

export const Title = styled.Text<TextInputProps>`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 12px;
    color: #FFF;
    margin-bottom: 5px;

    ${(props) =>
        !props.isFocused &&
        css`
            opacity: 0.3;
        `
    }
`;

export const CheckIcon = styled(Feather)`
    margin-left: 10px;
`;