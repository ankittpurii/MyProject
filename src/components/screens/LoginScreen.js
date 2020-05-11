import React, {useState, useEffect} from 'react';
import {Keyboard, TouchableOpacity, Image} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppTextField from '../reusable_comp/AppTextField';
import {screenWidth, screenHeight} from '../../Utils/Constants';
import RegisterButton from '../reusable_comp/RegisterButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import HOC from '../HOC';
import firebase from 'react-native-firebase';
import {signIn} from '../../actions/AuthActions';
import {showAlert} from '../../Utils/AlertHelper';

const LoginScreen = props => {
  const navigation = useNavigation();

  let passwordRef = null;
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  navigation.setOptions({
    title: 'Login',
    headerLeft: null,
  });

  const onLoginClick = async () => {
    const res = await dispatch(signIn(username, password, navigation));
    if (res.error) {
      // showAlert(res.error, 'Error');
    } else {
      console.log(res.success?.rname);
      subscribeToTopic('Online Restro');
      navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
    }
  };

  const subscribeToTopic = topicName => {
    let topic = topicName.replace(/ /g, '_');
    if (!/[a-zA-Z0-9-_.~%]/.test(topic)) {
      topic = "admin";
    }
    firebase
      .messaging()
      .subscribeToTopic(topic)
      .then(response => {
        console.log('Successfully subscribed to topic:', topic);
      })
      .catch(error => {
        console.log('Error subscribing to topic:', error);
      });
  };

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={Platform.OS === 'ios'}
      keyboardShouldPersistTaps={'always'}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        height: screenHeight,
        width: screenWidth,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            alignSelf: 'center',
            marginTop: -120,
            marginBottom: 20,
            height: 160,
            width: 250,
          }}
          source={require('../../assets/OrderOnline.png')}
        />
        <AppTextField
          onSubmitEditing={() => {
            passwordRef?.focus();
          }}
          returnKeyType={'next'}
          onChangeText={text => {
            setUsername(text);
          }}
          label="Username"
        />

        <AppTextField
          getRef={ref => {
            passwordRef = ref;
          }}
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
          }}
          autoCapitalize={'none'}
          label="Password"
        />

        <RegisterButton
          title={'Login'}
          autoCapitalize={'none'}
          onPress={() => {
            onLoginClick();
          }}
        />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default HOC(LoginScreen);
