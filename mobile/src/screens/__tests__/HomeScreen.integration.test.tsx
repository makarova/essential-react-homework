import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../HomeScreen';
import { RootStackParamList } from '../../types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

const mockedAsyncStorage = jest.mocked(AsyncStorage);

const Stack = createNativeStackNavigator<RootStackParamList>();

const AddLotteryStub = () => <Text>Add Lottery Screen</Text>;
const RegisterForLotteryStub = () => <Text>Register For Lottery Screen</Text>;

const mockLotteries = [
  {
    id: 'lottery-1',
    name: 'Summer Jackpot',
    prize: '$10,000',
    type: 'regular',
    status: 'running' as const,
  },
  {
    id: 'lottery-2',
    name: 'Winter Bonus',
    prize: '$5,000',
    type: 'bonus',
    status: 'running' as const,
  },
  {
    id: 'lottery-3',
    name: 'Spring Special',
    prize: '$7,500',
    type: 'special',
    status: 'finished' as const,
  },
];

const renderHomeScreen = () =>
  render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddLottery" component={AddLotteryStub} />
        <Stack.Screen
          name="RegisterForLottery"
          component={RegisterForLotteryStub}
        />
      </Stack.Navigator>
    </NavigationContainer>,
  );

describe('HomeScreen Integration', () => {
  beforeEach(() => {
    mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
    globalThis.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes('/lotteries')) {
        return Promise.resolve({
          ok: true,
          json: () => mockLotteries,
        });
      }

      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render title and fetch lotteries on mount', async () => {
    const { getByText } = renderHomeScreen();

    expect(getByText('Lotteries')).toBeTruthy();

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/lotteries'),
        expect.any(Object),
      );
    });

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
      expect(getByText('Winter Bonus')).toBeTruthy();
      expect(getByText('Spring Special')).toBeTruthy();
    });
  });

  it('should filter lotteries based on search term', async () => {
    const { getByPlaceholderText, getByText, queryByText } = renderHomeScreen();

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Filter lotteries');
    fireEvent.changeText(searchInput, 'Summer');

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
      expect(queryByText('Winter Bonus')).toBeNull();
      expect(queryByText('Spring Special')).toBeNull();
    });
  });

  it('should show no results message when search has no matches', async () => {
    const { getByPlaceholderText, getByText, queryByText } = renderHomeScreen();

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Filter lotteries');
    fireEvent.changeText(searchInput, 'NonExistentLottery');

    await waitFor(() => {
      expect(
        getByText('No results for search NonExistentLottery'),
      ).toBeTruthy();
      expect(queryByText('Summer Jackpot')).toBeNull();
    });
  });

  it('should enable register button when lottery is selected', async () => {
    const { getByText, getByTestId } = renderHomeScreen();

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
    });

    const lotteryCard = getByText('Summer Jackpot').parent?.parent;
    if (lotteryCard) {
      fireEvent.press(lotteryCard);
    }

    const registerButton = getByTestId('register-button');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(getByText('Register For Lottery Screen')).toBeTruthy();
    });
  });

  it('should navigate to AddLottery screen when add button is pressed', async () => {
    const { getByText, getByTestId } = renderHomeScreen();

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
    });

    const addButton = getByTestId('add-lottery-button');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText('Add Lottery Screen')).toBeTruthy();
    });
  });

  it('should handle complete user flow: search, select, and navigate to register', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderHomeScreen();

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Filter lotteries');
    fireEvent.changeText(searchInput, 'Summer');

    await waitFor(() => {
      expect(getByText('Summer Jackpot')).toBeTruthy();
    });

    const lotteryCard = getByText('Summer Jackpot').parent?.parent;
    if (lotteryCard) {
      fireEvent.press(lotteryCard);
    }

    const registerButton = getByTestId('register-button');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(getByText('Register For Lottery Screen')).toBeTruthy();
    });
  });

  it('should load registered lotteries from AsyncStorage', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify(['lottery-3']));

    const { getByText } = renderHomeScreen();

    await waitFor(() => {
      expect(getByText('Spring Special')).toBeTruthy();
    });

    await waitFor(() => {
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(
        'registeredLotteries',
      );
    });
  });
});
