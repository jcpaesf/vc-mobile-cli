import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    Background,
    ImageLogo,
    TitleWelcome,
    TitleWelcomeBold,
    SubTitle,
    ContainerButton,
    ButtonSignIn,
    ButtonSignInAndroid,
    ButtonScan,
    ButtonScanAndroid,
    TextSignIn,
    TextScan
} from './styles';

import backgroundImg from '../../assets/images/background.png';
import logoImg from '../../assets/images/logoVc.png';

const Login: React.FC = () => {
    const { navigate } = useNavigation();

    return (
        <Background source={backgroundImg} resizeMode="cover">
            <ImageLogo source={logoImg} resizeMode="contain" />
            <TitleWelcome>Bem-vindo(a) ao</TitleWelcome>
            <TitleWelcomeBold>Vest Connect</TitleWelcomeBold>
            <SubTitle>Um novo modelo de interatividade</SubTitle>
            <ContainerButton>
                {Platform.OS === 'ios' ?
                    <>
                        <ButtonSignIn onPress={() => { navigate('SignIn') }}>
                            <TextSignIn>Acessar</TextSignIn>
                        </ButtonSignIn>
                        <ButtonScan onPress={() => { navigate('Scan') }}>
                            <TextScan>Escanear produto</TextScan>
                        </ButtonScan>
                    </>
                    :
                    <>
                        <ButtonSignInAndroid onPress={() => { navigate('SignIn') }}>
                            <TextSignIn>Acessar</TextSignIn>
                        </ButtonSignInAndroid>
                        <ButtonScanAndroid onPress={() => { navigate('Scan') }}>
                            <TextScan>Escanear produto</TextScan>
                        </ButtonScanAndroid>
                    </>
                }
            </ContainerButton>
        </Background>
    );
}

export default Login;