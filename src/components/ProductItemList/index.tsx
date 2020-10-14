import React, { useState, useCallback } from 'react';
import { baseURL } from '../../services/api';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import ModalProduct from '../ModalProduct';

import {
    ContainerItem,
    ContainerContent,
    ImageProduct,
    TextTitleList,
    TextTypeProductList,
    ContainerContentProduct,
    TextContent,
    TextDate,
    TextValidate,
    ContainerNotification,
    TextNotification,
    ButtonAccess,
    ContainerContentData,
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
    hookOpacity(opacity: boolean): void;
}

const ProductListItem: React.FC<ProductProps> = ({ item, hookOpacity }) => {
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

    return (
        <>
            <ModalProduct hookCloseModal={handleModalVisible} item={item} visible={modalVisible} />

            <ContainerItem background={'#40995B'}>
                {item.content > 0 && <ContainerNotification><TextNotification>{item.content}</TextNotification></ContainerNotification>}

                {item.product.avatar && <ImageProduct
                    source={{ uri: `${baseURL}/files/${item.product.avatar}` }}
                    borderBottomLeftRadius={10}
                    borderTopLeftRadius={10} />
                }

                <ContainerContent>
                    <TextTitleList numberOfLines={1}>{item.product.user.nickname}</TextTitleList>
                    <TextTypeProductList numberOfLines={6} >{item.product.title}</TextTypeProductList>

                    <ContainerContentProduct>
                        <ContainerContentData style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextContent>{item.content > 0 ? 'CONTEÚDO NOVO\nDISPONÍVEL' : 'NENHUM\nCONTEÚDO NOVO'}</TextContent>
                            <TextValidate>VÁLIDO ATÉ{'\n'}<TextDate>{dateFormat}</TextDate></TextValidate>
                        </ContainerContentData>
                    </ContainerContentProduct>
                    <ButtonAccess onPress={handleModalVisible}>
                        <TextTitleList>Acessar</TextTitleList>
                    </ButtonAccess>
                </ContainerContent>
            </ContainerItem>
        </>
    );
}

export default ProductListItem;