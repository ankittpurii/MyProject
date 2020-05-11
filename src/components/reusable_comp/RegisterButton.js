import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const RegisterButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : {})}
      style={{
        width: '95%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: "red",
        ...style,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 17,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RegisterButton;
