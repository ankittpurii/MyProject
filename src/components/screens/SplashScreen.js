import React, {useEffect, usest} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HOC from '../HOC';
import {useSelector} from 'react-redux';
import firebase from 'react-native-firebase';
import Config from '../../Utils/Config';

/** Splash Screen of the Application */
const SplashScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.persistedReducer.token);

  navigation.setOptions({
    headerShown: false,
  });

  let appOpenedNotification = false;

  useEffect(() => {
    setTimeout(() => {
      if (!appOpenedNotification) {
        if (token?.length > 0)
          navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        else navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
      }
    }, 1000);

    setUpNotifications();
  }, []);

  const setUpNotifications = () => {
    // testing
    firebase
      .messaging()
      .getToken()
      .then(tok => {})
      .catch(err => {
        console.log(err, 'error first');
      });

    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('enable');
          setUpMessageListener();
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(res => {
              // console.log("did not")
              setUpMessageListener();
            });
        }
      })
      .catch(err => {
        console.log(err, 'error second');
      });
  };

  setUpMessageListener = () => {
    const channelID = 'GetOrdersOnline';
    if (Platform.OS === 'android') {
      // Create the channel
      const channel = new firebase.notifications.Android.Channel(
        channelID,
        'Get Orders Online App',
        firebase.notifications.Android.Importance.Max,
      );
      firebase.notifications().android.createChannel(channel);
    }

    // on notification shown

    firebase.notifications().onNotification(message => {
      console.log(message, 'this is notification');

      const date = new Date().toString();
      const notification = new firebase.notifications.Notification({
        sound: 'default',
        priority: 'high',
        show_in_foreground: true,
      })
        .setNotificationId(date)
        .setTitle(message.title)
        .setBody(message.body)
        .setData(message.data)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setChannelId(channelID)

        .android.setColor(Config.colors.THEME_COLOR);
      firebase
        .notifications()
        .displayNotification(notification)
        .catch(err => {
          console.log(err, 'this is err');
        });
    });

    // on notification clicked
    firebase.notifications().onNotificationOpened(notificationOpen => {
      appOpenedNotification = notificationOpen;

      if (appOpenedNotification) {
        const notification = notificationOpen.notification;
        handleNotification(notification);
      }
    });

    // when app is opened from a notification
    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        appOpenedNotification = notificationOpen;

        if (appOpenedNotification) {
          const notification = notificationOpen.notification;
          handleNotification(notification);
        }
      });
  };

  const handleNotification = notification => {
    firebase.notifications().removeAllDeliveredNotifications();
    // remove notification from notification list
    
    if (token?.length > 0) {
      if (notification?.data?.order_id && /^\d+$/.test(notification?.data?.order_id)) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Dashboard',
            },
            {
              name: 'OrderDetailScreen',
              params: {orderId: notification?.data?.order_id},
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Dashboard',
            },
            {
              name: 'OrdersList',
            },
          ],
        });
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoginScreen',
          },
        ],
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
        }}>
        Get Orders Online
      </Text>
    </View>
  );
};

export default HOC(SplashScreen);
