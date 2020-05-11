import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HOC from '../HOC';
import {resetAllReducers} from '../../actions/AuthActions';
import {showAlert} from '../../Utils/AlertHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const topic = useSelector(state => state.persistedReducer.topic);

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{
          padding: 6,
        }}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Feather name="menu" color="white" size={25} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{
          padding: 6,
        }}
        onPress={() => {
          onLogoutClick();
        }}>
        <MaterialCommunityIcons name="logout" color="white" size={25} />
      </TouchableOpacity>
    ),
  });

  const onLogoutClick = async () => {
    await showAlert('Are you sure want to Logout?', 'Logout', true)
      .then(res => {
        dispatch(resetAllReducers());
        firebase
          .messaging()
          .unsubscribeFromTopic(topic)
          .then(() => console.log('Unsubscribed fom the topic!', topic));
        navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
      })
      .catch(err => console.log(err));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          alignSelf: 'center',
          marginBottom: 20,
          height: 160,
          width: 250,
        }}
        source={require('../../assets/OrderOnline.png')}
      />
    </View>
  );
};

export default HOC(HomeScreen);
