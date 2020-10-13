import React, { useState, useCallback, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInputVs, Title, CheckIcon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon?: string;
    text: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const InputDate: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, text, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [haveValue, setHaveValue] = useState(false);
    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const [date, setDate] = useState('');

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.getElement().focus();
        }
    }));

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

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        if (!inputValueRef.current.value) {
            setIsFocused(false);
        } else {
            setHaveValue(true);
        }
    }, [inputValueRef, setHaveValue]);

    return (
        <>
            <Title isFocused={isFocused} isErrored={!!error}>{text}</Title>
            <Container isFocused={isFocused} isErrored={!!error}>
                <TextInputVs
                    type={'datetime'}
                    value={date}
                    options={{
                        format: 'DD/MM/YYYY'
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    keyboardAppearance="dark"
                    placeholderTextColor='#666360'
                    defaultValue={defaultValue}
                    ref={inputElementRef}
                    onChangeText={(value: any) => {
                        inputValueRef.current.value = value;
                        setDate(value);
                    }}
                    {...rest}
                />

                {(haveValue) ? <CheckIcon name="check" size={15} color="#FFF" /> : undefined}
            </Container>
        </>
    );
}

export default forwardRef(InputDate);