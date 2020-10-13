import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 50px;
    border-radius: 25px;
    flex-direction: row;
    margin-top: 10px;
    border: 1px solid #FFF;
    align-items: center;
    padding: 10px;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #FFF;
    font-size: 16px;
    height: 50px;
    font-family: 'MPLUSRounded1c-Regular';
`;