import React, { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import VideoFile from './video';

import { Container, Title, Description, DescriptionSite } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ResponseProductContentVideos {
    id: string;
    title: string;
    description: string;
    background: string;
    background_url: string;
    file: string;
    file_url: string;
    url?: string;
}

interface ProductContentVideoProps {
    item: ResponseProductContentVideos;
}

const ProductContentVideo: React.FC<ProductContentVideoProps> = ({ item }) => {
    const handleGoToUrl = useCallback(async () => {
        if (item.url) {
            const supported = await Linking.canOpenURL(item.url);

            if (supported) {
                await Linking.openURL(item.url);
            } else {
                Alert.alert(`Não foi possível abrir o site`);
            }
        }
    }, []);

    return (
        <Container>
            <VideoFile file={item.file_url} background={item.background_url} />
            <Title style={{ color: '#FFF' }}>{item.title}</Title>
            <Description style={{ color: '#FFF' }}>{item.description}</Description>
            {
                (item.url !== '' && item.url)
                &&
                <TouchableOpacity
                    onPress={handleGoToUrl}
                >
                    <DescriptionSite>Acesse o site</DescriptionSite>
                </TouchableOpacity>
            }
        </Container>
    )
}

export default ProductContentVideo;