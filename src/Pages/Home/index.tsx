import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    Animated,
    FlatList,
    Modal,
    Platform,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { AxiosResponse } from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import Lottie from 'lottie-react-native';

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
    TextTitle,
    ContainerModal,
    TextModal
} from './styles';

import loadingAnimation from '../../assets/animations/loadingVs.json';
import logoImg from '../../assets/images/logoVc.png';
import ProductListItem from '../../components/ProductItemList';
import InputNfc from '../../components/InputNfc';

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

interface SearchFormData {
    search: string;
}

interface AddProductProps {
    nfc_id: string;
}

const Home: React.FC = () => {
    const { navigate } = useNavigation();
    const [productsList, setProductsList] = useState<ResponseProductUser[]>([]);
    const [productsUser, setProductsUser] = useState<ResponseProductUser[]>([]);
    const [productsUserFilter, setProductsUserFilter] = useState<ResponseProductUser[]>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [opacityContainer, setOpacityContainer] = useState(false);
    const [visibleNfc, setVisibleNfc] = useState(false);
    const [listView, setListView] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const { user, signOut } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const formNfc = useRef<FormHandles>(null);

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
            ]);

            setProductsUserFilter(response.data);
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
    }, [signOut])

    const handleSearch = useCallback((data: SearchFormData) => {
        if (data.search) {
            if (!listView) {
                setProductsUser([
                    {
                        id: 'empty-left', product_id: '', product: {} as Product, tag: [], content: 0
                    },
                    ...productsUserFilter.filter(prd => prd.product.subtitle.toLowerCase().indexOf(data.search.toLowerCase()) !== -1),
                    {
                        id: 'empty-right', product_id: '', product: {} as Product, tag: [], content: 0
                    }
                ]);
            } else {
                setProductsList([...productsUserFilter.filter(prd => prd.product.subtitle.toLowerCase().indexOf(data.search.toLowerCase()) !== -1)])
            }
        } else {
            setProductsUser([
                {
                    id: 'empty-left', product_id: '', product: {} as Product, tag: [], content: 0
                },
                ...productsUserFilter,
                {
                    id: 'empty-right', product_id: '', product: {} as Product, tag: [], content: 0
                }
            ]);
            setProductsList([...productsUserFilter]);
        }
    }, [listView, setProductsList, productsUserFilter, setProductsUser]);

    const handleAddNfc = useCallback((data: AddProductProps) => {
        setShowAddProduct(true);

        api.post('/productsuser', data).then(apiResponse => {
            setShowAddProduct(false);
            setVisibleNfc(false);

            setProductsUserFilter([...productsUserFilter, apiResponse.data]);
            setProductsList([...productsUserFilter, apiResponse.data]);
            setProductsUser([
                {
                    id: 'empty-left', product_id: '', product: {} as Product, tag: [], content: 0
                },
                ...productsUserFilter,
                apiResponse.data,
                {
                    id: 'empty-right', product_id: '', product: {} as Product, tag: [], content: 0
                }
            ]);
        }).catch((e) => {
            setShowAddProduct(false);
            setVisibleNfc(false);

            Alert.alert('Mensagem', 'Erro ao adicionar produto. Tente novamente mais tarde.');
        });
    }, [setShowAddProduct, setVisibleNfc, setProductsUser, setProductsList, setProductsUserFilter, productsUserFilter]);

    const handleAddProduct = useCallback(async (nfc: boolean) => {
        const readTag = async () => {
            try {
                await NfcManager.registerTagEvent();
            } catch (ex) {
                NfcManager.unregisterTagEvent().catch(() => 0);
            }
        }

        try {
            if (nfc) {
                await NfcManager.start();

                NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag: any) => {
                    await NfcManager.setAlertMessageIOS('I got your tag!');
                    await NfcManager.unregisterTagEvent().catch(() => 0);
                });

                await readTag();
            } else {
                setVisibleNfc(nfc);
            }
        } catch (e) {
            setVisibleNfc(nfc);
        }
    }, [visibleNfc, setVisibleNfc]);

    return (
        <Container listView={listView}>
            {!listView && <Backdrop products={productsUser} scrollX={scrollX} />}

            <ContainerHeader opacityContainer={opacityContainer}>
                <Header>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Avatar source={{ uri: `${baseURL}/files/${user.avatar}` }} />
                    </TouchableOpacity>
                    <Logo source={logoImg} resizeMode="contain" />
                    <ContainerOptions>
                        <TouchableOpacity onPress={handleSetViewList}>
                            <Feather name={!listView ? "list" : "layers"} size={30} color="#FFF" style={{ paddingRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleAddProduct(!visibleNfc) }}>
                            {visibleNfc ?
                                <Feather name="minus-circle" size={30} color="#FFF" />
                                :
                                <Feather name="plus-circle" size={30} color="#FFF" />
                            }
                        </TouchableOpacity>
                    </ContainerOptions>
                </Header>

                {visibleNfc &&
                    <Form ref={formNfc} onSubmit={handleAddNfc} style={{ marginHorizontal: 25 }}>
                        <InputNfc
                            name="nfc_id"
                            placeholder="Informe o NFC do produto"
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                formNfc.current?.submitForm();
                            }}
                        />
                    </Form>
                }

                <TextTitle>Minha carteira</TextTitle>
                <View style={{ paddingHorizontal: 25, marginBottom: 5 }}>
                    <Form ref={formRef} onSubmit={handleSearch}>
                        <Search
                            name="search"
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                        />
                    </Form>
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={showAddProduct}
            >
                {Platform.OS === 'ios' ?
                    <Lottie source={loadingAnimation} loop={true} autoPlay={true} resizeMode='contain' />
                    :
                    <ContainerModal>
                        <TextModal style={{ color: '#FFF' }}>Adicionando produto</TextModal>
                    </ContainerModal>
                }

            </Modal>
        </Container>
    );
}

export default Home;