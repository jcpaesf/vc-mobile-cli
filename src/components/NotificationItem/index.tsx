import React, { useCallback, useState } from 'react';
import { Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ProductItem, ContainerSelect } from './styles';

interface NotificationItemProps {
    id: string;
    product_id: string;
    product: {
        avatar: string;
        avatar_url: string;
    };
    notification: boolean;
}

interface NotificationItem {
    item: NotificationItemProps;
}

const NotificationItem: React.FC<NotificationItem> = ({ item }) => {
    const [notification, setNotification] = useState(item.notification);

    const handleSelectItem = useCallback((notif: boolean) => {
        setNotification(notif);
        item.notification = notif;
    }, []);

    return (
        <ProductItem onPress={() => { handleSelectItem(!notification) }}>
            <Image
                source={{ uri: item.product.avatar_url }}
                resizeMode="cover"
                borderRadius={10}
                style={{ flex: 1 }}
            />
            <ContainerSelect notification={notification}>
                <Feather name='check' size={12} color='green' />
            </ContainerSelect>
        </ProductItem>
    );
}

export default NotificationItem;