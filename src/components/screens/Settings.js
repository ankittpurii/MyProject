import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HOC from '../HOC';

 const Settings = () => {

  const navigation = useNavigation();

  navigation.setOptions({
    title: 'Settings',
    // headerLeft: null,
  });

  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text>Settings</Text>
    </View>
  );
};

export default HOC(Settings)
