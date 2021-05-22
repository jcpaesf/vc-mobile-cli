import React from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useProduct } from '../../hooks/product';
import Heading from '../../components/Heading';
import Title from '../../components/Title';
import VideosList from '../../components/VideosList';
import backgroundImg from '../../assets/images/backgroundSignUp.png';

import { Container } from './styles';

interface Item {
    key: string;
    render: () => JSX.Element;
    isTitle?: boolean;
}

const Exclusive: React.FC = () => {
    const { goBack } = useNavigation();
    const { product_id } = useProduct();

    const { data, indices } = React.useMemo(() => {
        const items: Item[] = [{
            key: 'PAGE_HEADING',
            render: () => <Heading>Área exclusiva</Heading>,
        }, {
            key: 'VIDEOS',
            render: () => <Title>VÍDEOS</Title>,
            isTitle: true,
        }, {
            key: 'C1',
            render: () => <VideosList id={product_id} type="V" />
        }, {
            key: 'PICTURES',
            render: () => <Title>FOTOS</Title>,
            isTitle: true,
        }, {
            key: 'C2',
            render: () => <VideosList id={product_id} type="P" />
        }];

        const indices: number[] = [];

        items.forEach((item, index) => item.isTitle && indices.push(index));

        return {
            data: items,
            indices,
        };
    }, []);

    return (
        <Container source={backgroundImg} resizeMode="cover">
            <TouchableOpacity onPress={() => goBack()} style={{ marginTop: 25, marginLeft: 25 }}>
                <Feather name='chevron-left' size={25} color='#FFF' />
            </TouchableOpacity>
            <FlatList<Item>
                data={data}
                renderItem={({ item }) => item.render()}
                keyExtractor={(item) => item.key}
                stickyHeaderIndices={indices}
                onRefresh={() => { }}
                refreshing={false}
            />
        </Container>
    );
}

export default Exclusive;