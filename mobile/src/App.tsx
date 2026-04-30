import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';
import { RootStackParamList } from './types';
import HomeScreen from './screens/HomeScreen';
import AddLotteryScreen from './screens/AddLotteryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  title: '',
};

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={options} />
          <Stack.Screen
            name="AddLottery"
            component={AddLotteryScreen}
            options={options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
