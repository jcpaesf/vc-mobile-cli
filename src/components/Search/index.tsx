import React from 'react';
import { Container, TextInput } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { TextInputProps } from 'react-native';

const Search: React.FC<TextInputProps> = ({ ...rest }) => {
    return (
        <Container>
            <Feather name="search" size={20} color="#FFF" style={{ marginRight: 10 }} />

            <TextInput
                keyboardAppearance="dark"
                placeholderTextColor='#666360'
                {...rest}
            />
        </Container>
    );
}

export default Search;