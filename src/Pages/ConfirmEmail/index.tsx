import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
	Background,
	ViewLottie,
	TextConfirmEmail,
	TextEmail,
	TextObs,
	ContainerButton,
	ButtonLink,
	ButtonLinkAndroid,
	TextLink,
	ButtonSignIn,
	ButtonSignInAndroid,
	TextSignIn
} from './styles';

import backgroundImg from '../../assets/images/backgroundSignUp.png';
import sendEmailAnimation from '../../assets/animations/confirmemail.json';

const ConfirmEmail: React.FC = () => {
	const { navigate } = useNavigation();
	const { emailSignUp } = useAuth();
	const [reSendLink, setReSendLink] = useState(false);

	const reSendEmail = useCallback(async () => {
		setReSendLink(true);
		await api.post('/users/send', {
			email: emailSignUp
		});
		setReSendLink(false);
	}, []);

	return (
		<Background source={backgroundImg} resizeMode="cover">
			<ViewLottie>
				<Lottie source={sendEmailAnimation} loop={true} autoPlay={true} resizeMode='contain' />
			</ViewLottie>

			<TextConfirmEmail>Um email de confirmação de{'\n'}cadastro foi enviado para</TextConfirmEmail>
			<TextEmail numberOfLines={2}>{emailSignUp}</TextEmail>
			<TextObs>Favor acessar seu endereço de{'\n'}e-mail para confirmar seu cadastro</TextObs>

			<ContainerButton>
				{Platform.OS === 'ios' ?
					<>
						<ButtonLink onPress={reSendEmail} enabled={reSendLink ? false : true}>
							<TextLink>{reSendLink ? 'Enviando...' : 'Re-enviar link'}</TextLink>
						</ButtonLink>
						<ButtonSignIn onPress={() => { navigate('SignIn') }}>
							<TextSignIn>Voltar para tela de login</TextSignIn>
						</ButtonSignIn>
					</>
					:
					<>
						<ButtonLinkAndroid onPress={reSendEmail} disabled={reSendLink ? true : false}>
							<TextLink>{reSendLink ? 'Enviando...' : 'Re-enviar link'}</TextLink>
						</ButtonLinkAndroid>
						<ButtonSignInAndroid onPress={() => { navigate('SignIn') }}>
							<TextSignIn>Voltar para tela de login</TextSignIn>
						</ButtonSignInAndroid>
					</>
				}
			</ContainerButton>
		</Background>
	);
};

export default ConfirmEmail;
