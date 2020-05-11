import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useNav} from '@react-navigation/native';
import HOC from '../HOC';
import {useDispatch} from 'react-redux';
import {getOrdersDetails} from '../../actions/OrderActions';
import Config from '../../Utils/Config';
import {screenWidth} from '../../Utils/Constants';
import Feather from 'react-native-vector-icons/Feather';

const OrderDetailScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [ordersList, setOrdersList] = useState([]);

  props.navigation.setOptions({
    title: 'Order Detail',
    headerStyle: {
      backgroundColor: Config.colors.THEME_COLOR,
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerLeft: () => (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => props.navigation.goBack()}>
        <Feather color="white" name="chevron-left" size={28} />
      </TouchableOpacity>
    ),
  });

  const getOrderdetails = async orderId => {
    const res = await dispatch(getOrdersDetails(orderId, navigation));
    if (res.success) {
      setOrdersList(res.success);
    } else {
      setOrdersList([]);
    }
  };

  useEffect(() => {
    const orderId = props?.route?.params?.orderId;
    if (orderId) getOrderdetails(orderId);
  }, []);

  const gettoppingItems = items => {
    if (items.length == 0) return null;
    return items.map(data => {
      return (
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
            }}>
            <Text>{data.WebTopping}</Text>
          </View>

          <View
            style={{
              width: screenWidth / 3,
              padding: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>
              {data.WebAddRemove == 'no'
                ? '- ' + 1
                : data.WebAddRemove + ' ' + 1}
            </Text>
          </View>
          <View
            style={{
              width: screenWidth / 3,
              padding: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>${data.WebToppingPrice}</Text>
          </View>
        </View>
      );
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          padding: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Order Details :-
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          paddingLeft: 10,
        }}>
       Name : {ordersList[0]?.CustName}
      </Text>
      <Text
        style={{
          fontSize: 15,
          paddingLeft: 10,
        }}>
       Order Date : {ordersList[0]?.WebOrderDate}
      </Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={{
          padding: 10,
        }}
        data={ordersList[0]?.items}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flex: 1,
                marginTop: 10,
                borderWidth: StyleSheet.hairlineWidth,
                padding: 8,
                borderRadius: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      width: screenWidth / 2,
                      flexDirection: 'row',
                      // backgroundColor: 'yellow',
                    }}>
                    <Text>{item.ItemNo})</Text>
                    <Text>{item.WebCategory}</Text>
                  </View>

                  <Text>{item.WebItem}</Text>
                </View>
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: screenWidth / 3,
                    // alignItems: 'center',
                  }}>
                  <Text>{item.WebItemBase}</Text>
                  <Text>{item.WebItemSize}</Text>
                </View>
                <View style={{}}>
                  <Text>${item.WebItemPrice}</Text>
                  <Text>X {item.WebItemQty}</Text>
                </View>
              </View>

              {gettoppingItems(item.WebToppingItems)}
            </View>
          );
        }}
      />
      <View
        style={{
          width: '95%',
          height: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 10,
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Total :- ${ordersList[0]?.WebTotalAmt}
        </Text>
      </View>
    </View>
  );
};

export default OrderDetailScreen;
