import React, { useCallback, useRef } from 'react';
import { TextInput, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    TextConfig,
    ContainerPassword,
    ContainerEmail,
    ButtonEditProfile,
    ButtonEditProfileAndroid,
    TextEditProfile
} from './styles';

interface EditProfileProps {
    email: string;
    password: string;
    confirmPassword: string;
}

const EditProfile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);
    const { goBack, navigate } = useNavigation();
    const { user, editUser } = useAuth();

    const handleEditProfile = useCallback(async (data: EditProfileProps) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um e-mail válido')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            if (data.password && data.password !== data.confirmPassword) {
                Alert.alert(
                    'Mensagem',
                    'Senhas não conferem.',
                    [
                        { text: "OK" }
                    ]
                );

                return;
            }

            await editUser({
                email: data.email,
                password: data.password
            });

            Alert.alert(
                'Mensagem',
                'Cadastro alterado com sucesso.',
                [
                    { text: "OK", onPress: () => { navigate('Profile') } }
                ]
            );
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            Alert.alert(
                'Mensagem',
                'Ocorreu um erro ao editar seu perfil. Tente mais tarde.',
                [
                    { text: "OK", onPress: () => { navigate('Profile') } }
                ]
            );
        }
    }, []);

    return (
        <Container>
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>

            <TextConfig>Dados da conta</TextConfig>

            <Form initialData={{ email: user.email }} ref={formRef} onSubmit={handleEditProfile} style={{ flex: 1 }}>
                <ScrollView>
                    <ContainerEmail>
                        <Input
                            name="email"
                            icon="mail"
                            defaultValue={user.email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            text="E-MAIL"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus();
                            }}
                        />
                    </ContainerEmail>
                    <ContainerPassword>
                        <Input
                            ref={passwordInputRef}
                            name="password"
                            icon="lock"
                            text="SENHA"
                            secureTextEntry={true}
                            textContentType="newPassword"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                confirmPasswordInputRef.current?.focus();
                            }}
                        />
                        <Input
                            ref={confirmPasswordInputRef}
                            name="confirmPassword"
                            icon="lock"
                            text="CONFIRME SUA SENHA"
                            secureTextEntry={true}
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                            textContentType="newPassword"
                        />
                    </ContainerPassword>
                </ScrollView>

                {Platform.OS === 'ios' ?
                    <ButtonEditProfile onPress={() => {
                        formRef.current?.submitForm();
                    }}>
                        <TextEditProfile>Salvar</TextEditProfile>
                    </ButtonEditProfile>
                    :
                    <ButtonEditProfileAndroid onPress={() => {
                        formRef.current?.submitForm();
                    }}>
                        <TextEditProfile>Salvar</TextEditProfile>
                    </ButtonEditProfileAndroid>
                }
            </Form>
        </Container>
    )
}

export default EditProfile;