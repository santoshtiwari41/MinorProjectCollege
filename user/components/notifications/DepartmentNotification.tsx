import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getNotificationByDepartment } from '@/services/api';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
interface Notification {
  id: number;
  title: string;
  body: string;
  image: string | null;
}

const DepartmentNotification = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { departmentId } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (departmentId) {
      const fetchNotifications = async () => {
        try {
          const data = await getNotificationByDepartment(departmentId);
          setNotifications(data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }
  }, [departmentId]);

  const handlePress = (item: Notification) => {
    router.push({
      pathname: `/ButtomTab/notification/${item.id}`,
      params: { title: item.title, description: item.body, imageUrl: item.image },
    });
  };

  if (!notifications.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => handlePress(item)}
          >
            <Image source={{ uri: item.image ? item.image : 'https://via.placeholder.com/50' }} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    width: width,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  description: {
    fontFamily: 'Nunito-MediumItalic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default DepartmentNotification;
