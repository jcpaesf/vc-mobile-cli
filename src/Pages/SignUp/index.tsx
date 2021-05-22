import React, { useCallback, useRef, useState } from 'react';

import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
	TextInput,
	Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import InputDate from '../../components/InputDate';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { Background, TextTitle, ButtonSignUp, ButtonSignUpAndroid, TextSignUp } from './styles';

import backgroundImg from '../../assets/images/backgroundSignUp.png';

interface SignUpFormData {
	name: string;
	birth: Date;
	email: string;
	password: string;
	confirmpassword: string;
}

const SignUp: React.FC = () => {
	const birthInputRef = useRef<TextInput>(null);
	const emailInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);
	const confirmPasswordInputRef = useRef<TextInput>(null);
	const formRef = useRef<FormHandles>(null);
	const { goBack, navigate } = useNavigation();
	const { setEmail } = useAuth();

	const handleSignUp = useCallback(async (data: SignUpFormData) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().min(6, 'Mínimo 6 dígitos'),
				confirmpassword: Yup.string().min(6, 'Mínimo 6 dígitos')
			});

			if (data.password && data.password !== data.confirmpassword) {
				Alert.alert(
					'Mensagem',
					'Senhas não conferem.',
					[
						{ text: "OK" }
					]
				);

				return;
			}

			await schema.validate(data, {
				abortEarly: false
			});

			await api.post('users', data);

			setEmail(data.email);

			navigate('ConfirmEmail');
		} catch (e) {
			if (e instanceof Yup.ValidationError) {
				const errors = getValidationErrors(e);

				formRef.current?.setErrors(errors);

				return;
			}

			Alert.alert(
				'Erro no cadastro',
				'Ocorreu um erro ao fazer cadastro. Tente novamente.'
			);
		}
	}, []);

	return (
		<Background source={backgroundImg} resizeMode='cover'>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<TouchableOpacity onPress={() => goBack()} style={{ marginBottom: 25 }}>
					<Feather name='chevron-left' size={25} color='#FFF' style={{ marginTop: 25 }} />
				</TouchableOpacity>
				<ScrollView showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps='handled'>
					<View>
						<TextTitle>Preencha os campos abaixo{'\n'}com seus dados</TextTitle>
					</View>

					<Form ref={formRef} onSubmit={handleSignUp}>
						<Input
							name="name"
							text="NOME COMPLETO"
							autoCapitalize="words"
							returnKeyType="next"
							onSubmitEditing={() => {
								birthInputRef.current?.focus();
							}}
						/>
						<InputDate
							ref={birthInputRef}
							name="birth"
							text="DATA DE NASCIMENTO"
							keyboardType="numeric"
							returnKeyType="next"
							onSubmitEditing={() => {
								emailInputRef.current?.focus();
							}}
						/>
						<Input
							ref={emailInputRef}
							name="email"
							text="E-MAIL"
							keyboardType="email-address"
							autoCorrect={false}
							autoCapitalize="none"
							returnKeyType="next"
							textContentType="emailAddress"
							onSubmitEditing={() => {
								passwordInputRef.current?.focus();
							}}
						/>
						<Input
							ref={passwordInputRef}
							name="password"
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
							name="confirmpassword"
							text="CONFIRME SUA SENHA"
							secureTextEntry={true}
							returnKeyType="send"
							onSubmitEditing={() => {
								formRef.current?.submitForm();
							}}
							textContentType="newPassword"
						/>
						{Platform.OS === 'ios' ?
							<ButtonSignUp onPress={() => {
								formRef.current?.submitForm();
							}}>
								<TextSignUp>Criar conta</TextSignUp>
							</ButtonSignUp>
							:
							<ButtonSignUpAndroid onPress={() => {
								formRef.current?.submitForm();
							}}>
								<TextSignUp>Criar conta</TextSignUp>
							</ButtonSignUpAndroid>
						}
					</Form>
				</ScrollView>
			</KeyboardAvoidingView>
		</Background>
	);
};

export default SignUp;
