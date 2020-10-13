import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react-native';
import { Background, TextScan } from './styles';

import backgroundImg from '../../assets/images/background.png';
import scanAnimation from '../../assets/animations/scanradar.json';

const Home: React.FC = () => {
    const [scanOk, setScanOk] = useState(false);

    useEffect(() => {
        let scan = setTimeout(() => setScanOk(!scanOk), 3000);

        return () => {
            clearTimeout(scan);
        }
    }, [scanOk]);

    return (
        <Background source={backgroundImg} resizeMode="cover">
            <Lottie source={scanAnimation} loop={true} autoPlay={true} resizeMode='contain' />
            <TextScan>{!scanOk ? 'Aproxime seu aparelho do produto' : 'Produto scaneado com sucesso'}</TextScan>
        </Background>
    );
}

export default Home;