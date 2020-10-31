import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useProduct } from '../../hooks/product';
import { AxiosResponse } from 'axios';
import api from '../../services/api';

import ProductContentVideo from '../../components/ProductContentVideo';

import { Container } from './styles';

interface ResponseProductContentVideos {
    id: string;
    title: string;
    description: string;
    background: string;
    background_url: string;
    file: string;
    file_url: string;
}

const Videos: React.FC = () => {
    const [productContentVideos, setProductContentVideos] = useState<ResponseProductContentVideos[]>([]);
    const { goBack } = useNavigation();
    const { content_id } = useProduct();

    useEffect(() => {
        async function loadContent() {
            const response: AxiosResponse<ResponseProductContentVideos[]> = await api.get(`/productscontentvideos/${content_id}`);

            setProductContentVideos(response.data);
        }

        loadContent();
    }, []);

    return (
        <Container>
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25, marginLeft: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>

            <FlatList<ResponseProductContentVideos>
                data={productContentVideos}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, marginTop: 5 }}
                renderItem={({ item }) => <ProductContentVideo item={item} />}
            />
        </Container>
    );
}

export default Videos;