import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

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

import backgroundImg from '../../assets/images/background.png';
import sendEmailAnimation from '../../assets/animations/confirmemail.json';

const ConfirmEmail: React.FC = () => {
	const { navigate } = useNavigation();

	return (
		<Background source={backgroundImg} resizeMode="cover">
			<ViewLottie>
				<Lottie source={sendEmailAnimation} loop={true} autoPlay={true} resizeMode='contain' />
			</ViewLottie>

			<TextConfirmEmail>Um email de confirmação de{'\n'}cadastro foi enviado para</TextConfirmEmail>
			<TextEmail>jcpaesf@gmail.com</TextEmail>
			<TextObs>Favor acessar seu endereço de{'\n'}e-mail para confirmar seu cadastro</TextObs>

			<ContainerButton>
				{Platform.OS === 'ios' ?
					<>
						<ButtonLink>
							<TextLink>Re-enviar link</TextLink>
						</ButtonLink>
						<ButtonSignIn onPress={() => { navigate('SignIn') }}>
							<TextSignIn>Voltar para tela de login</TextSignIn>
						</ButtonSignIn>
					</>
					:
					<>
						<ButtonLinkAndroid>
							<TextLink>Re-enviar link</TextLink>
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
