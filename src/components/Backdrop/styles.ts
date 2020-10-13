import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
    width: ${width}px;
    height: ${height}px;
    position: absolute;
    background: rgba(0,0,0,1);
`;