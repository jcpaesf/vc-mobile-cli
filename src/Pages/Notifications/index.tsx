import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import NotificationItem from '../../components/NotificationItem';

import {
    Container,
    TextTitle,
    ButtonSignInAndroid,
    ButtonSignIn,
    TextSignIn
} from './styles';
import { AxiosResponse } from 'axios';

interface ProductUserProps {
    id: string;
    product_id: string;
    product: {
        avatar: string;
        avatar_url: string;
    };
    notification: boolean;
}

const Notifications: React.FC = () => {
    const { goBack, navigate } = useNavigation();
    const [products, setProducts] = useState<ProductUserProps[]>([]);

    useEffect(() => {
        async function getUserProducts() {
            const response: AxiosResponse<ProductUserProps[]> = await api.get('/productsuser');
            
            setProducts(response.data);
        }

        getUserProducts();
    }, []);

    const handleConfirm = useCallback(async () => {
        const prd = products.filter(prd => {
            return prd.notification
        }).map(prd => {
            return {
                product_id: prd.product_id
            }
        });

        if (prd.length > 0) {
            await api.post('/productsuser/notifications', { products: prd });
        } else {
            await api.post('/productsuser/notifications', { products: [] });
        }

        navigate('Profile');
    }, [products]);

    return (
        <Container>
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>
            <TextTitle>{'Selecione os produtos que\ndeseja ser notificado'}</TextTitle>
            <FlatList<ProductUserProps>
                data={products}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => {
                    return <NotificationItem
                        key={item.id}
                        item={item}
                    />
                }}
            />
            {Platform.OS === 'ios' ?
                <ButtonSignIn onPress={handleConfirm}>
                    <TextSignIn>Confirmar</TextSignIn>
                </ButtonSignIn>
                :
                <ButtonSignInAndroid onPress={handleConfirm}>
                    <TextSignIn>Confirmar</TextSignIn>
                </ButtonSignInAndroid>
            }
        </Container>
    );
}

export default Notifications;