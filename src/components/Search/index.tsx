import React, { useEffect, useRef } from 'react';
import { Container, TextInput } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

interface InputValueReference {
    value: string;
}

interface SearchProps extends TextInputProps {
    name: string;
}

const Search: React.FC<SearchProps> = ({ name, ...rest }) => {
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputElementRef = useRef<any>(null);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                inputValueRef.current.value = value;
                inputElementRef.current?.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current?.clear();
            }
        })
    }, [fieldName, registerField]);

    return (
        <Container>
            <Feather name="search" size={20} color="#FFF" style={{ marginRight: 10 }} />

            <TextInput
                keyboardAppearance="dark"
                placeholderTextColor='#666360'
                ref={inputElementRef}
                defaultValue={defaultValue}
                onChangeText={(value: any) => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    );
}

export default Search;