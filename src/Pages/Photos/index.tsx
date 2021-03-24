import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useProduct } from '../../hooks/product';
import { AxiosResponse } from 'axios';
import api from '../../services/api';

import ProductContentPhoto from '../../components/ProductContentPhoto';

import { Container } from './styles';

interface ResponseProductContentPhotos {
    id: string;
    title: string;
    description: string;
    background: string;
    file: string;
    file_url: string;
    url?: string;
}

const Videos: React.FC = () => {
    const [productContentPhotos, setProductContentPhotos] = useState<ResponseProductContentPhotos[]>([]);
    const { goBack } = useNavigation();
    const { content_id } = useProduct();

    useEffect(() => {
        async function loadContent() {
            const response: AxiosResponse<ResponseProductContentPhotos[]> = await api.get(`/productscontentphotos/${content_id}`);

            setProductContentPhotos(response.data);
        }

        loadContent();
    }, []);

    return (
        <Container>
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25, marginLeft: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>

            <FlatList<ResponseProductContentPhotos>
                data={productContentPhotos}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, marginTop: 5 }}
                renderItem={({ item }) => <ProductContentPhoto item={item} />}
            />
        </Container>
    );
}

export default Videos;