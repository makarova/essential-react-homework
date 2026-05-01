import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { RootStackParamList } from './types';
import HomeScreen from './screens/HomeScreen';
import AddLotteryScreen from './screens/AddLotteryScreen';
import RegisterForLotteryModal from './components/RegisterForLotteryModal';

const Stack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={options}
            />
            <Stack.Screen
              name="AddLottery"
              component={AddLotteryScreen}
              options={options}
            />
            <Stack.Screen
              name="RegisterForLottery"
              component={RegisterForLotteryModal}
              options={options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
