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
    TextScan,
    TitleTogether,
} from './styles';

import backgroundImg from '../../assets/images/backgroundSignIn.png';
import logoImg from '../../assets/images/logoVc.png';

const Login: React.FC = () => {
    const { navigate } = useNavigation();

    return (
        <Background source={backgroundImg} resizeMode="cover">
            <TitleWelcome>Bem-vindo(a) ao</TitleWelcome>
            <TitleWelcomeBold>Vest Connect</TitleWelcomeBold>
            <SubTitle>Um novo modelo de interatividade</SubTitle>
            <TitleTogether>TOGETHER{'\n'}WE RISE</TitleTogether>
            <ContainerButton>
                {Platform.OS === 'ios' ?
                    <>
                        <ButtonSignIn onPress={() => { navigate('SignIn') }}>
                            <TextSignIn>Acessar</TextSignIn>
                        </ButtonSignIn>
                        <ButtonScan onPress={() => { navigate('ScanAsync') }}>
                            <TextScan>Escanear produto</TextScan>
                        </ButtonScan>
                    </>
                    :
                    <>
                        <ButtonSignInAndroid onPress={() => { navigate('SignIn') }}>
                            <TextSignIn>Acessar</TextSignIn>
                        </ButtonSignInAndroid>
                        <ButtonScanAndroid onPress={() => { navigate('ScanAsync') }}>
                            <TextScan>Escanear produto</TextScan>
                        </ButtonScanAndroid>
                    </>
                }
            </ContainerButton>
        </Background>
    );
}

export default Login;