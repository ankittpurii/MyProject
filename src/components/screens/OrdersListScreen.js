import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import HOC from '../HOC';
import {convertDate} from '../../Utils/Constants';
import {getOrdersList} from '../../actions/OrderActions';
import {useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-datepicker';

const OrdersListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [ordersList, setOrdersList] = useState([]);

  navigation.setOptions({
    title: 'Order List',
  });

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    onDateSelected(today);
  }, []);

  const onDateSelected = async date => {
    const res = await dispatch(getOrdersList(date, navigation));
    if (res.success) {
      setOrdersList(res.success);
    } else {
      setOrdersList([]);
    }
    setDate(date);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          padding: 10,
        }}>
        <DatePicker
          style={{width: 200, color: 'red'}}
          date={date}
          mode="date"
          placeholder="Pick a Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            onDateSelected(date.toString());
          }}
        />
        <View
          style={{
            marginTop: 10,
          }}>
          <Text>Orders are on {date} :-</Text>
        </View>
      </View>
      <FlatList
        style={
          {
            // padding: 10,
          }
        }
        data={ordersList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OrderDetailScreen', {
                  orderId: item.WebOrder,
                });
              }}
              style={{
                flexDirection: 'row',
                marginTop: 10,
                padding: 8,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'black',
                // backgroundColor:'red'
              }}>
              <View>
                <Text
                  style={{
                    marginBottom: 6,
                  }}>
                  {item.CustName}
                </Text>
                <Text>Order {item.WebOrder}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  alignSelf: 'flex-end',
                }}>
                <Text>{item.OrderDueDate}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HOC(OrdersListScreen);
