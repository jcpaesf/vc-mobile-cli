import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import UserNotificationItem, {
  INotificationProps
} from '../../components/UserNotificationItem';

import {
  Container,
  TextTitle,
  Header
} from './styles';

const UserNotifications: React.FC = () => {
  const { goBack } = useNavigation();
  const [notification, setNotification] = useState<INotificationProps[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      const notifications: AxiosResponse<INotificationProps[]> = await api.get('/notification');

      setNotification(notifications.data);
    }

    loadNotifications();
  }, []);

  return (
    <Container>
      <Header style={{ marginTop: 25 }}>
        <TouchableOpacity onPress={() => goBack()} >
          <Feather name='chevron-left' size={25} color='#FFF' />
        </TouchableOpacity>
        <TextTitle>Notificações</TextTitle>
      </Header>
      <FlatList<INotificationProps>
        data={notification}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        contentContainerStyle={{ alignItems: 'center', borderRadius: 10 }}
        renderItem={({ item }) => (
          <UserNotificationItem item={item} />
        )}
      />
    </Container>
  )
}

export default UserNotifications;