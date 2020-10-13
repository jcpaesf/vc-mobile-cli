import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Container, ContainerContent, Title } from './styles';
import { baseURL } from '../../services/api';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { useProduct } from '../../hooks/product';

interface ResponseProductContent {
    id: string;
    description: string;
    type: string;
    background: string;
}

interface ItemProps {
    id: string;
    type: string;
}

const VideosList: React.FC<ItemProps> = ({ id, type }) => {
    const { navigate } = useNavigation();
    const [productContent, setProductContent] = useState<ResponseProductContent[]>([]);
    const { setContentId } = useProduct();

    const handleNavigateVideos = useCallback((contentId: string) => {
        setContentId(contentId);

        navigate('Videos');
    }, [])

    useEffect(() => {
        async function loadContent() {
            const response: AxiosResponse<ResponseProductContent[]> = await api.get(`/productscontent/${id}/${type}`);

            setProductContent(response.data);
        }

        loadContent();
    }, []);

    return (
        <>
            {productContent.map(content => {
                return (
                    <TouchableOpacity key={content.id} onPress={() => { handleNavigateVideos(content.id) }}>
                        <Container source={{ uri: `${baseURL}/files/${content.background}` }} imageStyle={{ opacity: 0.5 }} >
                            <ContainerContent>
                                <Title>{content.description}</Title>
                                <Feather name="chevron-right" color="#FFF" size={20} />
                            </ContainerContent>
                        </Container>
                    </TouchableOpacity>
                );
            })}
        </>
    );
}

export default VideosList;