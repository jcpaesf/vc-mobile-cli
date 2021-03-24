import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Animated,
  FlatList,
  Modal,
  Platform,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { AxiosResponse } from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import NfcManager from 'react-native-nfc-manager';
import Lottie from 'lottie-react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Search from '../../components/Search';
import Backdrop from '../../components/Backdrop';
import ProductItem from '../../components/ProductItem';
import api from '../../services/api';

import {
  Container,
  ContainerHeader,
  Header,
  Avatar,
  Logo,
  ContainerOptions,
  TextTitle,
  ContainerModal,
  TextModal,
  ContainerNfc,
  Camera,
  ContainerButtonBarCode,
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
  avatar_url: string;
}

interface Product {
  title: string;
  subtitle: string;
  nfc_id: string;
  validate: Date;
  avatar: string;
  background: string;
  background_url: string;
  avatar_url: string;
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
  password: string;
}

const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const [productsList, setProductsList] = useState<ResponseProductUser[]>([]);
  const [productsUser, setProductsUser] = useState<ResponseProductUser[]>([]);
  const [productsUserFilter, setProductsUserFilter] = useState<
    ResponseProductUser[]
  >([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [opacityContainer, setOpacityContainer] = useState(false);
  const [visibleNfc, setVisibleNfc] = useState(false);
  const [listView, setListView] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const { user, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const formNfc = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const inputNfcRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadProducts() {
      const response: AxiosResponse<ResponseProductUser[]> = await api.get(
        '/productsuser',
      );

      setProductsUser([
        {
          id: 'empty-left',
          product_id: '',
          product: {} as Product,
          tag: [],
          content: 0,
        },
        ...response.data,
        {
          id: 'empty-right',
          product_id: '',
          product: {} as Product,
          tag: [],
          content: 0,
        },
      ]);

      setProductsUserFilter(response.data);
      setProductsList(response.data);
    }

    async function handleVerifyPermission() {
      const { status } = await BarCodeScanner.getPermissionsAsync();

      setHasCameraAccess(status === 'granted');
    }

    loadProducts();
    handleVerifyPermission();
  }, [isFocused]);

  const handleSetViewList = useCallback(() => {
    setListView(!listView);
  }, [setListView, listView]);

  const handleSignOut = useCallback(async () => {
    navigate('Profile');
  }, [signOut]);

  const handleSearch = useCallback(
    (data: SearchFormData) => {
      if (data.search) {
        if (!listView) {
          setProductsUser([
            {
              id: 'empty-left',
              product_id: '',
              product: {} as Product,
              tag: [],
              content: 0,
            },
            ...productsUserFilter.filter(
              (prd) =>
                prd.product.subtitle
                  .toLowerCase()
                  .indexOf(data.search.toLowerCase()) !== -1,
            ),
            {
              id: 'empty-right',
              product_id: '',
              product: {} as Product,
              tag: [],
              content: 0,
            },
          ]);
        } else {
          setProductsList([
            ...productsUserFilter.filter(
              (prd) =>
                prd.product.subtitle
                  .toLowerCase()
                  .indexOf(data.search.toLowerCase()) !== -1,
            ),
          ]);
        }
      } else {
        setProductsUser([
          {
            id: 'empty-left',
            product_id: '',
            product: {} as Product,
            tag: [],
            content: 0,
          },
          ...productsUserFilter,
          {
            id: 'empty-right',
            product_id: '',
            product: {} as Product,
            tag: [],
            content: 0,
          },
        ]);
        setProductsList([...productsUserFilter]);
      }
    },
    [listView, setProductsList, productsUserFilter, setProductsUser],
  );

  const handleAddNfc = useCallback(
    async (data: AddProductProps) => {
      setShowAddProduct(true);

      try {
        await api.patch(`/passwords/inactive/${data.password}/pass`);
        await api.patch(`/productstagsnfc/inactive/${data.nfc_id}/nfc`);

        api
          .post('/productsuser', data)
          .then(async (apiResponse) => {
            setShowAddProduct(false);
            setVisibleNfc(false);

            setProductsUserFilter([...productsUserFilter, apiResponse.data]);
            setProductsList([...productsUserFilter, apiResponse.data]);
            setProductsUser([
              {
                id: 'empty-left',
                product_id: '',
                product: {} as Product,
                tag: [],
                content: 0,
              },
              ...productsUserFilter,
              apiResponse.data,
              {
                id: 'empty-right',
                product_id: '',
                product: {} as Product,
                tag: [],
                content: 0,
              },
            ]);
          })
          .catch((e) => {
            setShowAddProduct(false);
            setVisibleNfc(false);

            Alert.alert(
              'Mensagem',
              'Erro ao adicionar produto. Tente novamente mais tarde.',
            );
          });
      } catch (e) {
        setShowAddProduct(false);
        Alert.alert(
          'Mensagem',
          'Erro ao adicionar produto. Tente novamente mais tarde.',
        );
      }
    },
    [
      setShowAddProduct,
      setVisibleNfc,
      setProductsUser,
      setProductsList,
      setProductsUserFilter,
      productsUserFilter,
    ],
  );

  const handleAddProduct = useCallback(
    async (nfc: boolean) => {
      setQrCodeValue('');

      if (nfc) {
        const isSupported = await NfcManager.isSupported();

        if (isSupported) {
          Alert.alert('Mensagem', 'Deseja scanear o NFC ou informar manual?', [
            {
              text: 'Scanear',
              onPress: () => navigate('Scan'),
            },
            {
              text: 'Informar manual',
              onPress: () => setVisibleNfc(nfc),
            },
          ]);
        } else {
          setVisibleNfc(nfc);
        }
      } else {
        setVisibleNfc(nfc);
      }
    },
    [visibleNfc, setVisibleNfc, setQrCodeValue],
  );

  const handleOpenCamera = useCallback(async () => {
    if (!hasCameraAccess) {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const cameraAccess = status === 'granted';

      setHasCameraPermission(cameraAccess);
      setHasCameraAccess(cameraAccess);
    } else {
      setHasCameraPermission(hasCameraAccess);
    }
  }, [hasCameraAccess, setHasCameraPermission, setHasCameraAccess]);

  const handleBarCodeScanned = useCallback(
    (data: string) => {
      setHasCameraPermission(false);

      setQrCodeValue(data);
    },
    [setHasCameraPermission, setQrCodeValue],
  );

  if (hasCameraPermission) {
    return (
      <Container listView={false}>
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => handleBarCodeScanned(data)}
          style={StyleSheet.absoluteFillObject}
        />
        <ContainerButtonBarCode>
          <TouchableOpacity
            onPress={() => {
              setHasCameraPermission(false);
            }}>
            <Feather
              name="x-circle"
              size={50}
              color="#FFF"
              style={{ paddingRight: 20 }}
            />
          </TouchableOpacity>
        </ContainerButtonBarCode>
      </Container>
    );
  }

  return (
    <Container listView={listView}>
      {!listView && <Backdrop products={productsUser} scrollX={scrollX} />}

      <ContainerHeader opacityContainer={opacityContainer}>
        <Header>
          <TouchableOpacity onPress={handleSignOut}>
            {user.avatar_url ? (
              <Avatar source={{ uri: user.avatar_url }} />
            ) : (
              <EvilIcons name="user" color="#FFF" size={46} />
            )}
          </TouchableOpacity>
          <Logo source={logoImg} resizeMode="contain" />
          <ContainerOptions>
            <TouchableOpacity onPress={() => { navigate('UserNotifications') }}>
              <Feather
                name="bell"
                size={23}
                color="#FFF"
                style={{ paddingRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSetViewList}>
              <Feather
                name={!listView ? 'list' : 'layers'}
                size={23}
                color="#FFF"
                style={{ paddingRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleAddProduct(!visibleNfc);
              }}>
              {visibleNfc ? (
                <Feather name="minus-circle" size={23} color="#FFF" />
              ) : (
                <Feather name="plus-circle" size={23} color="#FFF" />
              )}
            </TouchableOpacity>
          </ContainerOptions>
        </Header>

        {visibleNfc && (
          <Form
            ref={formNfc}
            onSubmit={handleAddNfc}
            style={{ marginHorizontal: 25 }}>
            <ContainerNfc>
              <InputNfc
                ref={inputNfcRef}
                name="nfc_id"
                initialValue={qrCodeValue}
                placeholder="Informe o NFC ou o QRCode"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <TouchableOpacity onPress={handleOpenCamera}>
                <Camera name="camera" size={30} color="#FFF" />
              </TouchableOpacity>
            </ContainerNfc>
            <InputNfc
              ref={passwordInputRef}
              name="password"
              secureTextEntry={true}
              placeholder="Informe o password"
              returnKeyType="send"
              onSubmitEditing={() => {
                formNfc.current?.submitForm();
              }}
            />
          </Form>
        )}

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

      {!listView ? (
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
          snapToAlignment="start"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
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
              outputRange: [0.3, 1, 0.3],
            });

            return (
              <ProductItem
                item={item}
                translateY={translateY}
                opacity={opacity}
                hookOpacity={setOpacityContainer}
              />
            );
          }}
        />
      ) : (
        <FlatList<ResponseProductUser>
          data={productsList}
          keyExtractor={(item) => item.id}
          style={{ flex: 1, paddingHorizontal: 20, marginTop: 5 }}
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item }) => (
            <ProductListItem item={item} hookOpacity={setOpacityContainer} />
          )}
        />
      )}
      <Modal animationType="fade" transparent={true} visible={showAddProduct}>
        {Platform.OS === 'ios' ? (
          <Lottie
            source={loadingAnimation}
            loop={true}
            autoPlay={true}
            resizeMode="contain"
          />
        ) : (
          <ContainerModal>
            <TextModal style={{ color: '#FFF' }}>Adicionando produto</TextModal>
          </ContainerModal>
        )}
      </Modal>
    </Container>
  );
};

export default Home;
