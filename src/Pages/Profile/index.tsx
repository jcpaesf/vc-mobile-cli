import React, { useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../hooks/auth';
import { baseURL } from '../../services/api';
import ImagePicker from 'react-native-image-picker';
import api from '../../services/api';

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
    const { goBack, navigate } = useNavigation();
    const { user, signOut, updateUser } = useAuth();

    const handleSignOut = useCallback(async () => {
        await signOut();
    }, []);

    const handleUpdateAvatar = useCallback(() => {
        ImagePicker.showImagePicker({
            title: 'Selecione um avatar',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Usar câmera',
            chooseFromLibraryButtonTitle: 'Escolher da galeria'
        }, (response) => {
            if (response.didCancel) {
                return;
            }

            if (response.error) {
                Alert.alert('Erro ao atualizar seu avatar.');
                return;
            }

            const data = new FormData();

            data.append('avatar', {
                type: 'image/jpg',
                name: `${user.id}.jpg`,
                uri: response.uri
            });

            api.patch('/users/avatar', data).then(apiResponse => {
                updateUser(apiResponse.data);
            });
        })
    }, [user.id]);

    return (
        <Container>
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>

            <Header>
                <ContainerAvatar>
                    {user.avatar_url ?
                        <Avatar source={{ uri: user.avatar_url }} />
                        :
                        <EvilIcons name="user" color='#FFF' size={90} />
                    }

                    {Platform.OS === 'ios' ?
                        <ButtonAvatar onPress={handleUpdateAvatar}>
                            <Ionicons name="ios-add-circle" size={15} color="#FFF" />
                        </ButtonAvatar>
                        :
                        <ButtonAvatarAndroid onPress={handleUpdateAvatar}>
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

            <BorderlessButton onPress={() => { navigate('EditProfile') }}>
                <ContainerOptions>
                    <Feather name="user" size={25} color="#FFF" />
                    <TextOption>Dados da conta</TextOption>
                </ContainerOptions>
            </BorderlessButton>
            <BorderlessButton onPress={() => { navigate('Notifications') }}>
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