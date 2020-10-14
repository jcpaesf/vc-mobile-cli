import React, { useCallback, useState } from 'react';
import { Text, View, Animated, Dimensions, ScrollView } from 'react-native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import ModalProduct from '../ModalProduct';
import { baseURL } from '../../services/api';
import {
    ContainerContent,
    ContainerButton,
    ButtonAccess,
    ContainerImg,
    Image,
    ContainerProduct,
    TextAcess,
    TextContent,
    TextDate,
    TextProduct,
    TextTypeProduct,
    TextValidate
} from './styles';

interface User {
    nickname: string;
    avatar: string;
}

interface Product {
    title: string;
    subtitle: string;
    nfc_id: string;
    validate: Date;
    avatar: string;
    background: string;
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

interface ProductProps {
    item: ResponseProductUser;
    translateY: Animated.AnimatedInterpolation;
    opacity: Animated.AnimatedInterpolation;
    hookOpacity(opacity: boolean): void;
}

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.85;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const ProductItem: React.FC<ProductProps> = ({ item, translateY, opacity, hookOpacity }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dateValidate = new Date(item.product.validate);
    let dateFormat = '';

    if (item.product_id) {
        dateFormat = format(dateValidate, 'dd/MM/yyyy', { locale: ptBR });
    }

    const handleModalVisible = useCallback(() => {
        hookOpacity(!modalVisible);
        setModalVisible(!modalVisible);
    }, [hookOpacity, modalVisible, setModalVisible]);

    if (!item.product.avatar) {
        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }

    return (
        <>
            <ModalProduct hookCloseModal={handleModalVisible} item={item} visible={modalVisible} />

            <View style={{ width: ITEM_SIZE, marginTop: 10 }}>
                <ContainerContent style={{ padding: SPACING * 2, marginHorizontal: SPACING, opacity, transform: [{ translateY }] }}>
                    <ContainerImg>
                        <Image source={{ uri: `${baseURL}/files/${item.product.avatar}` }} borderRadius={5} resizeMode='contain' />
                    </ContainerImg>

                    <ContainerProduct>
                        <TextProduct>{item.product.user.nickname}</TextProduct>
                        <TextTypeProduct>{item.product.title}</TextTypeProduct>
                        <View style={{ width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextContent>{item.content ? 'CONTEÚDO NOVO\nDISPONÍVEL' : 'NENHUM\nCONTEÚDO NOVO'}</TextContent>
                            <TextValidate>VÁLIDO ATÉ{'\n'}<TextDate>{dateFormat}</TextDate></TextValidate>
                        </View>

                        <ContainerButton>
                            <ButtonAccess onPress={handleModalVisible}>
                                <TextAcess>Acessar</TextAcess>
                            </ButtonAccess>
                        </ContainerButton>
                    </ContainerProduct>
                </ContainerContent>
            </View>

        </>
    );
};

export default ProductItem;