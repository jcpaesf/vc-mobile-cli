import React, {
	useState,
	useEffect,
	useCallback,
	useRef
} from 'react';
import {
	Alert,
	TouchableOpacity,
	Modal,
	Platform
} from 'react-native';
import {
	Background,
	TextScan,
	Container,
	ContainerModal,
	ButtonCloseModal,
	ButtonCloseModalAndroid,
	ContainerModalContent,
	Image,
	TextTitleModal,
	TextTypeCompleteModal,
	TextDescriptionModal,
	TextSubmitButton,
	SubmitButton,
} from './styles';
import NfcManager, {
	NfcEvents,
	Ndef
} from 'react-native-nfc-manager';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import api from '../../services/api';
import backgroundImg from '../../assets/images/backgroundSignUp.png';
import scanAnimation from '../../assets/animations/scanradar.json';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import InputNfc from '../../components/InputNfc';
import Feather from 'react-native-vector-icons/Feather';
import InputPassword from '../../components/InputPassword';
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
	need_password: boolean;
}

const Home: React.FC = () => {
	const { goBack, navigate } = useNavigation();
	const [scanOk, setScanOk] = useState(false);
	const [manual, setManual] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [nfcId, setNfcId] = useState('');
	const [product, setProduct] = useState<ResponseExistsProduct>({} as ResponseExistsProduct)
	const formNfc = useRef<FormHandles>(null);
	const formPassword = useRef<FormHandles>(null);

	const handleAddNfc = useCallback(async (data: AddProductProps) => {
		await NfcManager.unregisterTagEvent().catch(() => 0);

		try {
			const response: AxiosResponse<ResponseExistsProduct> = await api.get(`/products/${data.nfc_id}/nfc`);

			setProduct(response.data);
			setNfcId(data.nfc_id);
			setModalVisible(true);
		} catch (e) {
			Alert.alert(
				'Mensagem',
				'Erro ao adicionar produto. Tente novamente mais tarde.',
				[
					{
						text: "OK",
						onPress: () => navigate('Home')
					}
				]
			);
		}
	}, [setNfcId, setProduct, setModalVisible]);

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
	}, [scanOk]);

	const handleConfirmPassword = useCallback(async (data: ConfirmPassword) => {
		try {
			product.need_password && await api.patch(`/passwords/inactive/${data.password}/pass`);
			await api.post('/productsuser', { nfc_id: nfcId });
			await api.patch(`/productstagsnfc/inactive/${nfcId}/nfc`);
			setModalVisible(false);
			navigate('Home');
			Alert.alert(
				'Mensagem',
				'O produto foi adicionado na sua carteira.'
			);
		} catch (e) {
			Alert.alert('Atenção', 'Ocorreu um erro ao adicionar seu produto. Tente mais tarde.');
		}
	}, [setModalVisible, nfcId]);

	return (
		<>
			<Background source={backgroundImg} resizeMode="cover">
				<TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25 }}>
					<Feather name='chevron-left' size={25} color='#FFF' />
				</TouchableOpacity>

				<Container>
					{manual ? (
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
					)
						:
						(
							<>
								<Lottie source={scanAnimation} loop={true} autoPlay={true} resizeMode='contain' />
								<TextScan>{!scanOk ? 'Aproxime seu aparelho do produto' : 'Produto scaneado com sucesso'}</TextScan>
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
							{product.need_password && <InputPassword
								name="password"
								placeholder="Informe o password"
								returnKeyType="send"
								secureTextEntry={true}
								icon="lock"
								onSubmitEditing={() => {
									formPassword.current?.submitForm();
								}}
							/>}
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