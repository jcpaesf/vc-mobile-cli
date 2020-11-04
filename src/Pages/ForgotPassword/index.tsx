import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    View,
    Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Feather from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';

import {
    Background,
    ContainerTitle,
    ContainerForgotPassword,
    ImageLogo,
    TitleForgotPasswordBold,
    ButtonForgotPassword,
    ButtonForgotPasswordAndroid,
    TextForgotPassword,
    ContainerButton,
    ButtonLink,
    TextLink,
    ButtonLinkAndroid
} from './styles';

import backgroundImg from '../../assets/images/background.png';
import logoImg from '../../assets/images/logoVc.png';

interface ForgotPasswordFormData {
    email: string;
    password: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { goBack, navigate } = useNavigation();
    const [showLoading, setShowLoading] = useState(false);
    const { setForgot } = useAuth();

    const handleForgotPassword = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setShowLoading(true);
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.post('password/forgot', {
                email: data.email
            });

            setShowLoading(false);

            setForgot(data.email);

            navigate('ResetPassword');
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                setShowLoading(false);

                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);

                return;
            }

            Alert.alert(
                'Erro no envio de e-mail',
                'Ocorreu um erro ao enviar seu e-mail, cheque os dados informados',
                [
                    { text: "Ok", onPress: () => { setShowLoading(false); } }
                ]
            );
        }
    }, []);

    return (
        <>
            <Background source={backgroundImg} resizeMode='cover'>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    enabled
                >
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={{ flex: 1 }}

                    >
                        <TouchableOpacity onPress={() => goBack()}>
                            <Feather name='chevron-left' size={25} color='#FFF' style={{ marginTop: 25 }} />
                        </TouchableOpacity>

                        <ContainerTitle>
                            <ImageLogo source={logoImg} resizeMode="contain" />
                            <View>
                                <TitleForgotPasswordBold>Informe seu{'\n'}e-mail</TitleForgotPasswordBold>
                            </View>
                        </ContainerTitle>
                        <ContainerForgotPassword>
                            <Form ref={formRef} onSubmit={handleForgotPassword}>
                                <Input
                                    name="email"
                                    icon="mail"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    text="E-MAIL"
                                    returnKeyType="send"
                                    onSubmitEditing={() => {
                                        formRef.current?.submitForm();
                                    }}
                                />
                            </Form>
                        </ContainerForgotPassword>
                        <ContainerButton>
                            {Platform.OS === 'ios' ?
                                <>
                                    <ButtonLink onPress={() => {
                                        formRef.current?.submitForm();
                                    }}>
                                        <TextLink>{showLoading ? 'Enviando...' : 'Enviar e-mail'}</TextLink>
                                    </ButtonLink>
                                    <ButtonForgotPassword onPress={() => { navigate('SignIn') }}>
                                        <TextForgotPassword>Voltar para tela de login</TextForgotPassword>
                                    </ButtonForgotPassword>
                                </>
                                :
                                <>
                                    <ButtonLinkAndroid onPress={() => {
                                        formRef.current?.submitForm();
                                    }}>
                                        <TextLink>{showLoading ? 'Enviando...' : 'Enviar e-mail'}</TextLink>
                                    </ButtonLinkAndroid>
                                    <ButtonForgotPasswordAndroid onPress={() => { navigate('SignIn') }}>
                                        <TextForgotPassword>Voltar para tela de login</TextForgotPassword>
                                    </ButtonForgotPasswordAndroid>
                                </>
                            }
                        </ContainerButton>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Background>
        </>
    );
}

export default ForgotPassword;