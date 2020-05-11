import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
  Platform,
  Image,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Config from '../Utils/Config';

const DrawerContent = props => {
  props.navigation.setOptions({
    headerShown: false,
  });

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        
        flex: Platform.os === 'ios' ? 1 : 0}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            paddingVertical:50
          }}>
          <Image
            style={{
              alignSelf: 'center',
              marginBottom: 20,
              height: 100,
              width: 150,
            }}
            source={require('../assets/OrderOnline.png')}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <DrawerItem
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            label="Orders List"
            onPress={() => {
              props.navigation.navigate('OrdersList');
            }}
          />

          <DrawerItem
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            label="Item Master"
            onPress={() => {
              props.navigation.navigate('ItemMaster');
            }}
          />
          <DrawerItem
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            label="Size Base Settings"
            onPress={() => props.navigation.navigate('Sizebase')}
          />
          <DrawerItem
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            label="Toppings Master"
            onPress={() => {
              // props.navigation.closeDrawer();
              props.navigation.navigate('ToppingsMaster');
            }}
          />
          <DrawerItem
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            label="Category Master"
            onPress={() => props.navigation.navigate('CategoryMaster')}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {
    alignItems: 'flex-start',
    paddingVertical: 3,
    marginVertical: 0,
    borderBottomWidth:StyleSheet.hairlineWidth
  },
  drawerLabel: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    height: 100,
    width: 100,
  },
});

export default DrawerContent;
