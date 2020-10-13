import React from 'react';

import VideoFile from './video';

import { Container, Title, Description } from './styles';

interface ResponseProductContentVideos {
    id: string;
    title: string;
    description: string;
    background: string;
    file: string;
}

interface ProductContentVideoProps {
    item: ResponseProductContentVideos;
}

const ProductContentVideo: React.FC<ProductContentVideoProps> = ({ item }) => {
    return (
        <Container>
            <VideoFile file={item.file} background={item.background} />
            <Title style={{ color: '#FFF' }}>{item.title}</Title>
            <Description style={{ color: '#FFF' }}>{item.description}</Description>
        </Container>
    )
}

export default ProductContentVideo;