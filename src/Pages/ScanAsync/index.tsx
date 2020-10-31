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
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import InputNfc from '../../components/InputNfc';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import backgroundImg from '../../assets/images/background.png';
import scanAnimation from '../../assets/animations/scanradar.json';
import {
    Background,
    TextScan,
    Container,
    ContainerButton,
    ButtonManual,
    TextManual,
    ButtonManualAndroid,
    ViewLottie
} from './styles';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

interface AddProductProps {
    nfc_id: string;
}

interface ResponseExistsProduct {
    exists: boolean;
}

const Home: React.FC = () => {
    const { goBack, navigate } = useNavigation();
    const [manual, setManual] = useState(false);
    const formNfc = useRef<FormHandles>(null);

    const handleAddNfc = useCallback(async (data: AddProductProps) => {
        await NfcManager.unregisterTagEvent().catch(() => 0);

        const response: AxiosResponse<ResponseExistsProduct> = await api.get(`/products/${data.nfc_id}`);

        if (!response.data.exists) {
            Alert.alert('Erro ao inserir', 'Ocorreu um erro ao inserir seu produto. Tente novamente.');

            return;
        }

        await AsyncStorage.setItem('@VsConnect:nfcid', data.nfc_id);

        Alert.alert('Produto adicionado', 'Faça login para concluir o cadastro do seu produto.');

        navigate('Landing');
    }, []);

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
    );
}

export default Home;