import React from 'react';
import { View, FlatList, Animated, Dimensions, Image } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
//import { LinearGradient } from 'expo-linear-gradient';
import { baseURL } from '../../services/api';

import { Container } from './styles';

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

interface ResponseProductUser {
    id: string;
    product_id: string;
    product: Product;
}

interface BackdropProps {
    products: ResponseProductUser[];
    scrollX: Animated.Value;
}

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.85;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Backdrop: React.FC<BackdropProps> = ({ products, scrollX }) => {
    return (
        <Container renderToHardwareTextureAndroid>
            <FlatList
                data={products.reverse()}
                keyExtractor={(item) => item.id}
                removeClippedSubviews={false}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ width, height }}
                renderItem={({ item, index }) => {
                    if (!item.product.background) {
                        return null;
                    }
                    const translateX = scrollX.interpolate({
                        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                        outputRange: [-width, 0],
                    });
                    return (
                        <MaskedView
                            style={{
                                width,
                                height,
                                position: 'absolute',
                                opacity: 0.5
                            }}
                            maskElement={
                                <AnimatedSvg
                                    width={width}
                                    height={height}
                                    style={{
                                        backgroundColor: 'transparent',
                                        transform: [{ translateX }],
                                    }}
                                >
                                    <Rect
                                        x='0'
                                        y='0'
                                        width={width}
                                        height={height}
                                        fill='red'
                                    />
                                </AnimatedSvg>
                            }
                        >
                            <Image
                                source={{ uri: `${baseURL}/files/${item.product.background}` }}
                                style={{
                                    width,
                                    height,
                                    resizeMode: 'cover',
                                }}
                            />
                        </MaskedView>
                    );
                }}
            />
            
        </Container>
    )
}

/*<LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'white']}
                style={{
                    height,
                    width,
                    position: 'absolute',
                    bottom: 0,
                }}
            /> */

export default Backdrop;