import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

const requestUserPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  return enabled;
};

useEffect(() => {
  const setupFCM = async () => {
    const hasPermission = await requestUserPermission();

    if (!hasPermission) {
      console.log('Permission denied');
      return;
    }

    const token = await messaging().getToken();
    console.log(token);

    const initialNotifications = await loadNotifications();
    setNotifications(initialNotifications);

    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification && initialNotification.notification) {
      console.log('Notification caused app to open from quit state:', initialNotification.notification);
      const { title, body } = initialNotification.notification;
      if (title && body) {
        const newNotifications = [...initialNotifications, { title, body }];
        setNotifications(newNotifications);
        saveNotifications(newNotifications);
      }
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.notification) {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
        const { title, body } = remoteMessage.notification;
        if (title && body) {
          const newNotifications = [...notifications, { title, body }];
          setNotifications(newNotifications);
          saveNotifications(newNotifications);
        }
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage.notification) {
        console.log('Message handled in the background:', remoteMessage.notification);
        const { title, body } = remoteMessage.notification;
        if (title && body) {
          const newNotifications = [...notifications, { title, body }];
          setNotifications(newNotifications);
          saveNotifications(newNotifications);
        }
      }
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        const { title, body } = remoteMessage.notification;
        if (title && body) {
          const newNotifications = [...notifications, { title, body }];
          setNotifications(newNotifications);
          saveNotifications(newNotifications);
        }
      }
    });

    return unsubscribe;
  };

  const unsubscribeFCM = setupFCM();
  return () => {
    unsubscribeFCM.then(unsub => unsub && unsub());
  };
}, []);
