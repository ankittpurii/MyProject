import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HOC from '../HOC';
import {useDispatch} from 'react-redux';
import {getSizeBaseData, updateSizeBaseData} from '../../actions/OrderActions';
import {CheckBox} from 'react-native-elements';
import Config from '../../Utils/Config';
import {screenWidth} from '../../Utils/Constants';

const Sizebase = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [sizeBaseData, setSizeBaseData] = useState([]);
  const [JSONarray, setJSONarray] = useState([]);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const setData = (item, base, index) => {
    
    let copySizeBaseData = sizeBaseData;
    const baseIndex = copySizeBaseData[index].bases.findIndex(
      item => item.bid == base.bid,
    );

    const basePosition = copySizeBaseData[index].bases[baseIndex];
    if (basePosition.is_active == '0') {
      basePosition.is_active = '1';
      setTrigger(prevState => {
        return !prevState;
      });
    } else {
      basePosition.is_active = '0';
      setTrigger(prevState => {
        return !prevState;
      });
    }
    setSizeBaseData(copySizeBaseData);
    const res = dispatch(updateSizeBaseData(copySizeBaseData, navigation));
  };

  const getData = async () => {
    const res = await dispatch(getSizeBaseData(navigation));
    if (res.success) {
      setSizeBaseData(res.success);
      createJSON(res.success);
    }
  };

  const createJSON = array => {
    let JSONarray = [];
    for (let i = 0; i < array.length; i++) {
      JSONarray.push({
        szid: array[i].szid,
      });
      for (let j = 0; j < 2; j++) {
        if (array[i].bases[j].is_active == '1') {
          if (JSONarray[i].bid) {
            JSONarray[i].bid = '1,2';
          } else JSONarray[i].bid = array[i].bases[j].bid;
        }
      }
    }
    setJSONarray(JSONarray);
  };

  navigation.setOptions({
    title: 'Size Base',
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: (screenWidth / 3)-40,
            padding: 8,

            borderWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Size
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            padding: 8,
            borderWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Base
          </Text>
        </View>
      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={sizeBaseData}
        extraData={trigger}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: (screenWidth / 3)-40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: StyleSheet.hairlineWidth,
                }}>
                <Text>{item.szname}</Text>
              </View>
              {item.bases.map((base) => {
            
                return (
                  <View
                    style={{
                      width: (screenWidth / 3)+20,
                      paddingLeft: 10,
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderWidth: StyleSheet.hairlineWidth,
                    }}>
                    <Text
                      style={{
                        paddingRight: 8,
                      }}>
                      {base.bname}
                    </Text>
                    <CheckBox
                      onPress={() => {
                        setData(item, base, index);
                      }}
                      containerStyle={{
                        backgroundColor: 'white',
                        marginLeft: 0,
                        borderWidth: 0,
                        paddingHorizontal: 0,
                      }}
                      uncheckedColor="black"
                      checked={parseInt(base.is_active)}
                      checkedColor={Config.colors.THEME_COLOR}
                    />
                  </View>
                );
              })}
              {/* <View
                style={{
                  width: screenWidth / 2,
                  paddingLeft: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderWidth: StyleSheet.hairlineWidth,
                }}>
                <Text
                  style={{
                    paddingRight: 8,
                  }}>
                  {item.bases[0].bname}
                </Text>
                <CheckBox
                  onPress={() => {}}
                  containerStyle={{
                    backgroundColor: 'white',
                    marginLeft: 0,
                    borderWidth: 0,
                    paddingHorizontal: 0,
                  }}
                  uncheckedColor="black"
                  checked={parseInt(item.bases[0].is_active)}
                  checkedColor={Config.colors.THEME_COLOR}
                />

                <Text
                  style={{
                    paddingRight: 8,
                  }}>
                  {item.bases[1].bname}
                </Text>
                <CheckBox
                  // onPress={() => {
                  //   this.setState({
                  //     checked: !this.state.checked,
                  //   });
                  // }}
                  containerStyle={{
                    backgroundColor: 'white',
                    marginLeft: 0,
                    borderWidth: 0,
                    paddingHorizontal: 0,
                  }}
                  uncheckedColor="black"
                  checked={parseInt(item.bases[1].is_active)}
                  checkedColor={Config.colors.THEME_COLOR}
                />
              </View> */}
            </View>
          );
        }}
      />
    </View>
  );
};

export default HOC(Sizebase);
