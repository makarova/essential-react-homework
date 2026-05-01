import { StackNavigationProp } from '@react-navigation/stack';
export type Status = 'running' | 'finished';

export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: Status;
}

export interface CreateLotteryPayload {
  name: string;
  prize: string;
}

// navigation types
export type RootStackParamList = {
  Home: undefined;
  AddLottery: undefined;
  RegisterForLottery: { selectedLotteryIds: string[] };
};

export type AddLotteryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddLottery',
  'RegisterForLottery'
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
