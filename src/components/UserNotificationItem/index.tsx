import React, { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Description, DescriptionSite } from './styles';

export interface INotificationProps {
  id: string;
  message: string;
  url?: string;
}

interface IUserNotificationProps {
  item: INotificationProps
}

const UserNotificationItem: React.FC<IUserNotificationProps> = ({ item }) => {
  const handleGoToUrl = useCallback(async () => {
    if (item.url) {
      const supported = await Linking.canOpenURL(item.url);

      if (supported) {
        await Linking.openURL(item.url);
      } else {
        Alert.alert(`Não foi possível abrir o site`);
      }
    }
  }, []);

  return (
    <Container>
      <Description>
        {item.message}
      </Description>
      {item.url && <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
        onPress={handleGoToUrl}
      >
        <DescriptionSite>Acesse o site</DescriptionSite>
      </TouchableOpacity>}
    </Container>
  )
}

export default UserNotificationItem;