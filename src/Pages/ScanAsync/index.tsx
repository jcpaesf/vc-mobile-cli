import React, {
	useState,
	useEffect,
	useCallback,
	useRef
} from 'react';
import NfcManager, {
	NfcEvents,
	Ndef
} from 'react-native-nfc-manager';
import {
	Alert,
	Modal,
	Platform,
	TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import InputNfc from '../../components/InputNfc';
import InputPassword from '../../components/InputPassword';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import backgroundImg from '../../assets/images/backgroundSignUp.png';
import scanAnimation from '../../assets/animations/scanradar.json';
import {
	Background,
	TextScan,
	Container,
	ContainerButton,
	ButtonManual,
	TextManual,
	ButtonManualAndroid,
	ViewLottie,
	ContainerModal,
	ButtonCloseModal,
	ButtonCloseModalAndroid,
	ContainerModalContent,
	TextTitleModal,
	Image,
	TextTypeCompleteModal,
	TextDescriptionModal,
	SubmitButton,
	TextSubmitButton,
} from './styles';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

interface AddProductProps {
	nfc_id: string;
}

interface ConfirmPassword {
	password: string;
}

interface ResponseExistsProduct {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	avatar_url: string;
	need_password: string;
}

const Home: React.FC = () => {
	const { goBack, navigate } = useNavigation();
	const [manual, setManual] = useState(false);
	const [nfcId, setNfcId] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [product, setProduct] = useState<ResponseExistsProduct>({} as ResponseExistsProduct)
	const formNfc = useRef<FormHandles>(null);
	const formPassword = useRef<FormHandles>(null);

	const handleAddNfc = useCallback(async (data: AddProductProps) => {
		await NfcManager.unregisterTagEvent().catch(() => 0);

		const response: AxiosResponse<ResponseExistsProduct> = await api.get(`/products/${data.nfc_id}/nfc`);

		if (!response.data.id) {
			Alert.alert('Erro ao inserir', 'Ocorreu um erro ao inserir seu produto. Tente novamente.');

			return;
		}

		setProduct(response.data);
		setNfcId(data.nfc_id);
		setModalVisible(true);
	}, [setProduct, setModalVisible, setNfcId]);

	const handleConfirmPassword = useCallback(async (data: ConfirmPassword) => {
		try {
			product.need_password && await api.patch(`passwords/inactive/${data.password}/pass`);
			await AsyncStorage.setItem('@VsConnect:nfcid', nfcId);

			Alert.alert(
				'Produto adicionado',
				'Faça login para concluir o cadastro do seu produto.',
				[
					{
						text: "OK", onPress: () => {
							setModalVisible(false);
							navigate('SignIn');
						}
					}
				]
			);
		} catch (e) {
			Alert.alert('Atenção', 'Password inválido. Tente novamente.');
		}
	}, [nfcId, setModalVisible, product]);

	useEffect(() => {
		async function readTag() {
			try {
				await NfcManager.registerTagEvent();
			} catch (ex) {
				NfcManager.unregisterTagEvent().catch(() => 0);
			}
		}

		async function startReadNfc() {
			await NfcManager.start();

			NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag: any) => {
				if (tag.ndefMessage && tag.ndefMessage.length > 0) {
					let parsed = null;
					const ndefRecords = tag.ndefMessage;
					parsed = ndefRecords.map((record: any) => {
						if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
							return ["text", Ndef.text.decodePayload(record.payload)];
						}
						if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
							return ["uri", Ndef.uri.decodePayload(record.payload)];
						}
					});

					handleAddNfc({ nfc_id: parsed[0][1] });
				}
			});

			await readTag();
		}

		startReadNfc();
	}, []);

	return (
		<>
			<Background source={backgroundImg} resizeMode="cover">
				<TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25 }}>
					<Feather name='chevron-left' size={25} color='#FFF' />
				</TouchableOpacity>

				<Container>
					{manual ? (
						<>
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
							<ContainerButton>
								{Platform.OS === 'ios' ?
									<ButtonManual onPress={() => { setManual(!manual) }}>
										<TextManual>{manual ? 'Scanear NFC' : 'Informar manual'}</TextManual>
									</ButtonManual>
									:
									<ButtonManualAndroid onPress={() => { setManual(!manual) }}>
										<TextManual>{manual ? 'Scanear NFC' : 'Informar manual'}</TextManual>
									</ButtonManualAndroid>
								}
							</ContainerButton>
						</>
					)
						:
						(
							<>
								<ViewLottie>
									<Lottie source={scanAnimation} loop={true} autoPlay={true} resizeMode='contain' />
								</ViewLottie>
								<ContainerButton>
									<TextScan>Aproxime seu aparelho do produto</TextScan>
									{Platform.OS === 'ios' ?
										<>
											<ButtonManual onPress={() => { setManual(!manual) }}>
												<TextManual>{manual ? 'Scanear NFC' : 'Informar manual'}</TextManual>
											</ButtonManual>
										</>
										:
										<>
											<ButtonManualAndroid onPress={() => { setManual(!manual) }}>
												<TextManual>{manual ? 'Scanear NFC' : 'Informar manual'}</TextManual>
											</ButtonManualAndroid>
										</>
									}
								</ContainerButton>
							</>
						)
					}
				</Container>
			</Background>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
			>
				<ContainerModal>
					{Platform.OS === 'ios' ?
						<ButtonCloseModal onPress={() => { setModalVisible(false) }}>
							<Feather name="x" size={25} color="#FFF" />
						</ButtonCloseModal>
						:
						<ButtonCloseModalAndroid onPress={() => { setModalVisible(false) }}>
							<Feather name="x" size={25} color="#FFF" />
						</ButtonCloseModalAndroid>
					}
					<ContainerModalContent>
						<Image resizeMode="contain" source={{ uri: product.avatar_url }} />

						<TextTitleModal>{product.title}</TextTitleModal>
						<TextTypeCompleteModal>{product.subtitle}</TextTypeCompleteModal>
						<TextDescriptionModal>{product.description}</TextDescriptionModal>

						<Form ref={formPassword} onSubmit={handleConfirmPassword} style={{ marginHorizontal: 25 }}>
							{product.need_password &&
								<InputPassword
									name="password"
									placeholder="Informe o password"
									returnKeyType="send"
									secureTextEntry={true}
									icon="lock"
									onSubmitEditing={() => {
										formPassword.current?.submitForm();
									}}
								/>
							}
						</Form>
						{!product.need_password && <SubmitButton onPress={() => {
							formPassword.current?.submitForm();
						}}>
							<TextSubmitButton>Adicionar produto</TextSubmitButton>
						</SubmitButton>}
					</ContainerModalContent>
				</ContainerModal>
			</Modal>
		</>
	);
}

export default Home;