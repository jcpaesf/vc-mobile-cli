import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { Image, Modal } from 'react-native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Feather from 'react-native-vector-icons/Feather';
import { baseURL } from '../../services/api';
import { useProduct } from '../../hooks/product';
import {
    ContainerModal,
    ButtonCloseModal,
    ButtonCloseModalAndroid,
    ContainerModalContent,
    TextTitleModal,
    TextTypeCompleteModal,
    TextDescriptionModal,
    ContainerRow,
    TagProduct,
    TextTag,
    ContainerContentModal,
    TextDateModal,
    TextContentModal,
    TextValidateModal,
    ButtonAccessModal,
    ButtonAccessModalAndroid,
    TextAcess
} from './styles';
import { useNavigation } from '@react-navigation/native';

interface User {
    nickname: string;
    avatar: string;
    avatar_url: string;
}

interface Product {
    title: string;
    subtitle: string;
    nfc_id: string;
    validate: Date;
    avatar: string;
    background: string;
    avatar_url: string;
    background_url: string;
    description: string;
    user: User;
}

interface Tag {
    id: string;
    description: string;
}

interface ResponseProductUser {
    id: string;
    product_id: string;
    product: Product;
    tag: Tag[];
    content: number;
}

interface ModalProps {
    item: ResponseProductUser;
    visible: boolean;
    hookCloseModal(): void;
}

const ModalProduct: React.FC<ModalProps> = ({ item, hookCloseModal, visible }) => {
    const { navigate } = useNavigation();
    const { setProductId } = useProduct();
    const dateValidate = new Date(item.product.validate);
    let dateFormat = '';

    if (item.product_id) {
        dateFormat = format(dateValidate, 'dd/MM/yyyy', { locale: ptBR });
    }

    const navigateExclusive = useCallback(() => {
        hookCloseModal();
        setProductId(item.product_id);
        navigate('Exclusive');
    }, [hookCloseModal]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <ContainerModal>
                {Platform.OS === 'ios' ?
                    <ButtonCloseModal onPress={hookCloseModal}>
                        <Feather name="x" size={25} color="#FFF" />
                    </ButtonCloseModal>
                    :
                    <ButtonCloseModalAndroid onPress={hookCloseModal}>
                        <Feather name="x" size={25} color="#FFF" />
                    </ButtonCloseModalAndroid>
                }
                <ContainerModalContent>
                    <Image resizeMode="contain" style={{ width: 132, height: 99 }} source={{ uri: item.product.user.avatar_url}} />

                    <TextTitleModal>{item.product.title}</TextTitleModal>
                    <TextTypeCompleteModal>{item.product.subtitle}</TextTypeCompleteModal>
                    <TextDescriptionModal>{item.product.description}</TextDescriptionModal>

                    <ContainerRow>
                        {item.tag.map(tg => <TagProduct key={tg.id}><TextTag>{tg.description}</TextTag></TagProduct>)}
                    </ContainerRow>

                    <ContainerContentModal>
                        <TextContentModal>{item.content ? 'CONTEÚDO NOVO\nDISPONÍVEL' : 'NENHUM\nCONTEÚDO NOVO'}</TextContentModal>
                        <TextValidateModal>VÁLIDO ATÉ{'\n'}<TextDateModal>{dateFormat}</TextDateModal></TextValidateModal>
                    </ContainerContentModal>

                    {Platform.OS === 'ios' ?
                        <ButtonAccessModal onPress={navigateExclusive}>
                            <TextAcess>Acessar</TextAcess>
                        </ButtonAccessModal>
                        :
                        <ButtonAccessModalAndroid onPress={navigateExclusive}>
                            <TextAcess>Acessar</TextAcess>
                        </ButtonAccessModalAndroid>
                    }
                </ContainerModalContent>
            </ContainerModal>
        </Modal>
    );
}

export default ModalProduct;