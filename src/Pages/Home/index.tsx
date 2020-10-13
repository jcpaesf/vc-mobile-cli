import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    Animated,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { AxiosResponse } from 'axios';
import Feather from 'react-native-vector-icons/Feather';

import Search from '../../components/Search';
import Backdrop from '../../components/Backdrop';
import ProductItem from '../../components/ProductItem';
import api, { baseURL } from '../../services/api';

import {
    Container,
    ContainerHeader,
    Header,
    Avatar,
    Logo,
    ContainerOptions,
    TextTitle
} from './styles';

import logoImg from '../../assets/images/logoVc.png';
import ProductListItem from '../../components/ProductItemList';

const { width } = Dimensions.get('window');

const ITEM_SIZE = width * 0.85;

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

const Home: React.FC = () => {
    const { navigate } = useNavigation();
    const [productsList, setProductsList] = useState<ResponseProductUser[]>([]);
    const [productsUser, setProductsUser] = useState<ResponseProductUser[]>([]);
    const [opacityContainer, setOpacityContainer] = useState(false);
    const [listView, setListView] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const { user, signOut } = useAuth();

    useEffect(() => {
        async function loadProducts() {
            const response: AxiosResponse<ResponseProductUser[]> = await api.get('/productsuser');

            setProductsUser([
                {
                    id: 'empty-left', product_id: '', product: {} as Product, tag: [], content: 0
                },
                ...response.data,
                {
                    id: 'empty-right', product_id: '', product: {} as Product, tag: [], content: 0
                }
            ])
        }

        loadProducts();
    }, []);

    const handleSetViewList = useCallback(() => {
        setListView(!listView);

        setProductsList(productsUser.filter(product => {
            return product.product_id;
        }));
    }, [productsUser, setProductsList, setListView, listView]);

    const handleSignOut = useCallback(async () => {
        navigate('Profile');

        //await signOut();
    }, [signOut])

    const handleSearch = useCallback((text: string) => {

    }, []);

    return (
        <Container listView={listView}>
            {!listView && <Backdrop products={productsUser} scrollX={scrollX} />}

            <ContainerHeader opacityContainer={opacityContainer}>
                <Header>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Avatar source={{ uri: `${baseURL}/files/${user.avatar}` }} resizeMode="contain" />
                    </TouchableOpacity>
                    <Logo source={logoImg} resizeMode="contain" />
                    <ContainerOptions>
                        <TouchableOpacity onPress={handleSetViewList}>
                            <Feather name={!listView ? "list" : "layers"} size={30} color="#FFF" style={{ paddingRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="plus-circle" size={30} color="#FFF" />
                        </TouchableOpacity>
                    </ContainerOptions>
                </Header>

                <TextTitle>Minha carteira</TextTitle>
                <View style={{ paddingHorizontal: 25, marginBottom: 5 }}>
                    <Search onChangeText={handleSearch} />
                </View>
            </ContainerHeader>

            {!listView ?
                <Animated.FlatList<ResponseProductUser>
                    showsHorizontalScrollIndicator={false}
                    data={productsUser}
                    keyExtractor={(item) => item.id}
                    horizontal
                    style={{ flex: 1 }}
                    bounces={false}
                    decelerationRate={0.2}
                    contentContainerStyle={{ alignItems: 'center' }}
                    snapToInterval={ITEM_SIZE}
                    snapToAlignment='start'
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 2) * ITEM_SIZE,
                            (index - 1) * ITEM_SIZE,
                            index * ITEM_SIZE,
                        ];

                        const translateY = scrollX.interpolate({
                            inputRange,
                            outputRange: [100, 0, 100],
                        });

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3]
                        });

                        return (
                            <ProductItem item={item} translateY={translateY} opacity={opacity} hookOpacity={setOpacityContainer} />
                        );
                    }}
                />
                :
                <FlatList<ResponseProductUser>
                    data={productsList}
                    keyExtractor={(item) => item.id}
                    style={{ flex: 1, paddingHorizontal: 20, marginTop: 5 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => <ProductListItem item={item} hookOpacity={setOpacityContainer} />}
                />
            }
        </Container>
    );
}

export default Home;