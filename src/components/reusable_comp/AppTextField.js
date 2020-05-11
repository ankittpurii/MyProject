import React from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';

export default TextField = props => {
  return (
    <OutlinedTextField
      ref={ref => {
        if (props.getRef) props.getRef(ref);
      }}
      editable={props.editable}
     
      containerStyle={{
        margin: 10,
      }}
      returnKeyType={props.returnKeyType}
      onSubmitEditing={props.onSubmitEditing}
      secureTextEntry={props.secureTextEntry}
      label={props.label}
      error={props.error}
      keyboardType={props.keyboardType}
      tintColor="red"
      autoCapitalize={props.autoCapitalize}
      onChangeText={text => {
        if (props.onChangeText) props.onChangeText(text);
      }}
    />
  );
};
