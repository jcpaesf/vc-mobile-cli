import React, { useCallback } from 'react';
import { Platform, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../hooks/auth';
import { baseURL } from '../../services/api';

import {
    Container,
    Header,
    ContainerAvatar,
    Avatar,
    ButtonAvatarAndroid,
    ButtonAvatar,
    ContainerUser,
    TextNameUser,
    TextEmailUser,
    TextConfig,
    ContainerOptions,
    TextOption
} from './styles';

const Profile: React.FC = () => {
    const { goBack } = useNavigation();
    const { user, signOut } = useAuth();

    const handleSignOut = useCallback(async () => {
        await signOut();
    }, []);

    return (
        <Container>
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>

            <Header>
                <ContainerAvatar>
                    <Avatar source={{ uri: `${baseURL}/files/${user.avatar}` }} resizeMode='contain' />
                    {Platform.OS === 'ios' ?
                        <ButtonAvatar onPress={() => { }}>
                            <Ionicons name="ios-add-circle" size={15} color="#FFF" />
                        </ButtonAvatar>
                        :
                        <ButtonAvatarAndroid onPress={() => { }}>
                            <Ionicons name="ios-add-circle" size={15} color="#FFF" />
                        </ButtonAvatarAndroid>
                    }
                </ContainerAvatar>
                <ContainerUser>
                    <TextNameUser>{user.name}</TextNameUser>
                    <TextEmailUser>{user.email}</TextEmailUser>
                </ContainerUser>
            </Header>

            <TextConfig>Configurações</TextConfig>


            <BorderlessButton>
                <ContainerOptions>
                    <Feather name="user" size={25} color="#FFF" />
                    <TextOption>Dados da conta</TextOption>
                </ContainerOptions>
            </BorderlessButton>
            <BorderlessButton>
                <ContainerOptions>
                    <Feather name="bell" size={25} color="#FFF" />
                    <TextOption>Notificações</TextOption>
                </ContainerOptions>
            </BorderlessButton>
            <BorderlessButton>
                <ContainerOptions>
                    <Feather name="file-text" size={25} color="#FFF" />
                    <TextOption>Termos de uso</TextOption>
                </ContainerOptions>
            </BorderlessButton>

            <BorderlessButton onPress={handleSignOut} style={{ marginTop: 40 }}>
                <ContainerOptions>
                    <Feather name="log-out" size={25} color="#FFF" />
                    <TextOption>Sair</TextOption>
                </ContainerOptions>
            </BorderlessButton>
        </Container>
    );
}

export default Profile;