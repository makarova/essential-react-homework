import { StackNavigationProp } from '@react-navigation/stack';
export type Status = 'running' | 'finished';

export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: Status;
}

// navigation types
export type RootStackParamList = {
  Home: undefined;
  AddLottery: undefined;
};

export type AddLotteryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddLottery'
>;

// export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export interface CreateLotteryRequest {
  name: string;
  prize: string;
}

export interface RegisterForLotteryRequest {
  name: string;
  lotteryId: string;
}
