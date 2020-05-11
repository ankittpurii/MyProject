import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HOC from '../HOC';
import {useDispatch} from 'react-redux';
import {getItemData, updateItemData} from '../../actions/OrderActions';
import {screenWidth} from '../../Utils/Constants';
import Config from '../../Utils/Config';

const ItemMaster = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  navigation.setOptions({
    title: 'Item Master',
  });

  const getData = async () => {
    const res = await dispatch(getItemData(navigation));
    if (res.success) {
      setItemData(res.success);
    }
  };

  const toggleSwitch = async index => {
    let copyItemData = [...itemData];
    if (copyItemData[index].active == 'N') {
      dispatch(updateItemData(copyItemData[index].itemid, 'Y', navigation));
      copyItemData[index].active = 'Y';
    } else {
      dispatch(updateItemData(copyItemData[index].itemid, 'N',navigation));
      copyItemData[index].active = 'N';
    }
    setItemData(copyItemData);
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
            width: screenWidth / 3,
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: StyleSheet.hairlineWidth,
          }}>
          <Text>ItemID</Text>
        </View>

        <View
          style={{
            width: screenWidth / 3,
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: StyleSheet.hairlineWidth,
          }}>
          <Text>Item Name</Text>
        </View>

        <View
          style={{
            width: screenWidth / 3,
            borderWidth: StyleSheet.hairlineWidth,

            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Status</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}

        data={itemData}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: screenWidth / 3,
                  padding: 8,
                  borderWidth: StyleSheet.hairlineWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                  }}>
                  {item.itemid}
                </Text>
              </View>

              <View
                style={{
                  width: screenWidth / 3,
                  padding: 8,
                  borderWidth: StyleSheet.hairlineWidth,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                  }}>
                  {item.itemname}
                </Text>
              </View>

              <View
                style={{
                  width: screenWidth / 3,
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
                    // trackColor={{false: '#767577', true: 'green'}}
                    // thumbColor={ 'green'}
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

export default HOC(ItemMaster);
