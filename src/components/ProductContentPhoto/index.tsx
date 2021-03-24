import React, { useCallback, useState } from 'react';
import { Animated, Dimensions, Alert, Linking } from 'react-native';
import { State, PinchGestureHandler, PinchGestureHandlerStateChangeEvent, TouchableOpacity } from 'react-native-gesture-handler';

import { Container, Title, Description, DescriptionSite } from './styles';

interface ResponseProductContentVideos {
    id: string;
    title: string;
    description: string;
    background: string;
    file: string;
    file_url: string;
    url?: string;
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
                    source={{ uri: item.file_url }}
                    resizeMode='cover'
                />
            </PinchGestureHandler>
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