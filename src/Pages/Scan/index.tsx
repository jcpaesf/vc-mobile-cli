import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { Background, TextScan, Container } from './styles';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import api from '../../services/api';
import backgroundImg from '../../assets/images/background.png';
import scanAnimation from '../../assets/animations/scanradar.json';
import { Alert, TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import InputNfc from '../../components/InputNfc';
import Feather from 'react-native-vector-icons/Feather';

interface AddProductProps {
    nfc_id: string;
}

const Home: React.FC = () => {
    const { goBack, navigate } = useNavigation();
    const [scanOk, setScanOk] = useState(false);
    const [manual, setManual] = useState(false);
    const formNfc = useRef<FormHandles>(null);

    const handleAddNfc = useCallback(async (data: AddProductProps) => {
        await NfcManager.unregisterTagEvent().catch(() => 0);

        api.post('/productsuser', data).then(apiResponse => {
            setScanOk(true);

            setTimeout(() => {
                navigate('Home');
            }, 1000);
        }).catch((e) => {
            if (manual) {
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
            } else {
                Alert.alert(
                    'Mensagem',
                    'Erro ao adicionar produto. Tente novamente mais tarde.',
                    [
                        {
                            text: "OK",
                            onPress: () => navigate('Home')
                        },
                        {
                            text: "Informar manual",
                            onPress: () => setManual(true)
                        }
                    ]
                );
            }
        });
    }, [setScanOk, manual, setManual]);

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

    return (
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
    );
}

export default Home;