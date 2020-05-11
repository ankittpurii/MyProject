import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HOC from '../HOC';
import {useDispatch} from 'react-redux';
import {
  getItemData,
  updateItemData,
  getCategoryData,
  updateToppingData,
  getToppingData,
} from '../../actions/OrderActions';
import {screenWidth} from '../../Utils/Constants';
import Config from '../../Utils/Config';

const ToppingsMaster = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [toppingData, setToppingData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  navigation.setOptions({
    title: 'Toppings Master',
  });
  
  const getData = async () => {
    const res = await dispatch(getToppingData(navigation));
    if (res.success) {
      setToppingData(res.success);
    }
  };

  const toggleSwitch = async index => {
    let copyItemData = [...toppingData];
    if (copyItemData[index].active == 'N') {
      dispatch(updateToppingData(copyItemData[index].Name, 'Y', navigation));
      copyItemData[index].active = 'Y';
    } else {
      dispatch(updateToppingData(copyItemData[index].Name, 'N', navigation));
      copyItemData[index].active = 'N';
    }
    setToppingData(copyItemData);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: screenWidth / 2,
            padding: 8,
            borderWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Topping Name</Text>
        </View>

        <View
          style={{
            width: screenWidth / 2,
            padding: 8,
            borderWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Status</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={toppingData}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: screenWidth / 2,
                  padding: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: StyleSheet.hairlineWidth,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                  }}>
                  {item.Name}
                </Text>
              </View>
              <View
                style={{
                  width: screenWidth / 2,
                  borderWidth: StyleSheet.hairlineWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 8,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color:
                      item.active == 'N' ? Config.colors.THEME_COLOR : 'green',
                    fontSize: 16,
                  }}>
                  {item.active == 'N' ? 'InActive' : 'Active'}
                </Text>
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <Switch
                    trackColor={{false: 'lightgrey', true: '#F08080'}}
                    thumbColor={item.active == 'N' ? 'white' : 'red'}
                    // ios_backgroundColor="#3e3e3e"
                    ios_backgroundColor="grey"

                    onValueChange={() => toggleSwitch(index)}
                    value={item.active == 'N' ? false : true}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HOC(ToppingsMaster);
