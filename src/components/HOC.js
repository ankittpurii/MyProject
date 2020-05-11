import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import LoadingComp from '../components/reusable_comp/LoadingComp';
import config from '../Utils/Config';
import Feather from 'react-native-vector-icons/Feather';

/**
 * HOC for including reusable UI logic
 */

const HOC = (ChildComponent, params) => {
  function InnerHOC(props) {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: config.colors.THEME_COLOR,
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      title: 'Get Orders Online',
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            alignItems:'center',
            justifyContent: 'center',
            marginRight:10
          }}
          onPress={() => props.navigation.goBack()}>
          <Feather 
          color="white"
          name="chevron-left" size={28} />
        </TouchableOpacity>
      ),
    });
    const loadingStatus = useSelector(
      state => state.LoadingReducer.loadingStatus,
    );
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: config.colors.BACKGROUND_COLOR,
        }}>
        <ChildComponent />
        {loadingStatus ? <LoadingComp /> : null}
      </SafeAreaView>
    );
  }
  return InnerHOC;
};
export default HOC;
