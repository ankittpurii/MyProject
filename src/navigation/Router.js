import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Config from '../Utils/Config';
import {
  LoginScreen,
  HomeScreen,
  Settings,
  OrderDetailScreen,
  SizeBase,
  ItemMaster,
  CategoryMaster,
  ToppingsMaster,
} from '../components/screens';
import DrawerContent from './DrawerContent';
import SplashScreen from '../components/screens/SplashScreen';
import OrdersListScreen from '../components/screens/OrdersListScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen">
        {props => <HomeScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const drawer = props => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <DrawerContent {...props} />;
      }}
      drawerStyle={{
        flex: 1,
      }}
      contentContainerStyle={{flex: 1}}>
      <Drawer.Screen name="Screens">
        {props => {
          return <DrawerScreens props={props} />;
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const mainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ToppingsMaster" component={ToppingsMaster} />
        <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />

        <Stack.Screen name="OrdersList" component={OrdersListScreen} />
        <Stack.Screen name="Sizebase" component={SizeBase} />
        <Stack.Screen name="ItemMaster" component={ItemMaster} />
        <Stack.Screen name="CategoryMaster" component={CategoryMaster} />
        <Stack.Screen
          name="Dashboard"
          component={drawer}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Config.colors.THEME_COLOR,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   drawerStyles: {
//     flex: 1,
//     width: '50%',
//     backgroundColor: 'transparent'
//   },
//   drawerItem: {
//     alignItems: 'flex-start',
//     paddingVertical: 3,
//     marginVertical: 0,
//   },
//   drawerLabel: {
//     color: Config.colors.THEME_COLOR,
//     fontSize: normalize(12),
//   },
//   avatar: {
//     borderRadius: 60,
//     marginBottom: 16,
//     height: 100,
//     width: 100,
//     borderColor: 'white',
//     borderWidth: 1,
//     backgroundColor: '#5D647B',
//   },
// });

export default mainStack;
