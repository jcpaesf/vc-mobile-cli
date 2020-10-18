import React, { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import GestureHandler, { State, PinchGestureHandler, PinchGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';
import { baseURL } from '../../services/api';

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

const { width } = Dimensions.get('window');
const SIZE = width;

const ProductContentVideo: React.FC<ProductContentVideoProps> = ({ item }) => {
    const [scaleImg, setScaleImg] = useState(new Animated.Value(1));
    
    const onPinchEvent = Animated.event([
        { nativeEvent: { scale: scaleImg } }
    ], {
        useNativeDriver: true
    });

    const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scaleImg, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 1
            }).start();
        }
    }

    return (
        <Container>
            <PinchGestureHandler
                onGestureEvent={onPinchEvent}
                onHandlerStateChange={onPinchStateChange}
            >
                <Animated.Image
                    style={{
                        height: SIZE,
                        width: SIZE,
                        transform: [
                            { scale: scaleImg }
                        ]
                    }}
                    source={{ uri: `${baseURL}/files/${item.file}` }}
                    resizeMode='cover'
                />
            </PinchGestureHandler>
            <Title style={{ color: '#FFF' }}>{item.title}</Title>
            <Description style={{ color: '#FFF' }}>{item.description}</Description>
        </Container>
    )
}

export default ProductContentVideo;