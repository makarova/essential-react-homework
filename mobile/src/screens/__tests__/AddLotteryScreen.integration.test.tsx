import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import AddLotteryScreen from '../AddLotteryScreen';

const mockGoBack = jest.fn();
const mockShow = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

jest.mock('react-native-toast-notifications', () => ({
  ...jest.requireActual('react-native-toast-notifications'),
  useToast: () => ({
    show: mockShow,
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const renderAddLotteryScreen = () =>
  render(
    <ToastProvider>
      <AddLotteryScreen />
    </ToastProvider>,
  );

describe('AddLotteryScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes('/lotteries')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 'lottery-new',
              name: 'Test Lottery',
              prize: '$1,000',
              type: 'simple',
              status: 'running',
            }),
        });
      }

      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with title and input fields', () => {
    const { getByText, getByPlaceholderText } = renderAddLotteryScreen();

    expect(getByText('Add a new lottery')).toBeTruthy();
    expect(getByPlaceholderText('Lottery name')).toBeTruthy();
    expect(getByPlaceholderText('Lottery prize')).toBeTruthy();
  });

  it('should call goBack when close button is pressed', () => {
    const { getByLabelText } = renderAddLotteryScreen();

    const closeButton = getByLabelText('Close');
    fireEvent.press(closeButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('should submit form and call API on successful creation', async () => {
    const { getByPlaceholderText, getByText } = renderAddLotteryScreen();

    const nameInput = getByPlaceholderText('Lottery name');
    const prizeInput = getByPlaceholderText('Lottery prize');

    fireEvent.changeText(nameInput, 'Test Lottery');
    fireEvent(nameInput, 'blur');
    fireEvent.changeText(prizeInput, '$1,000');
    fireEvent(prizeInput, 'blur');

    await waitFor(() => {
      expect(nameInput.props.value).toBe('Test Lottery');
      expect(prizeInput.props.value).toBe('$1,000');
    });

    const addButton = getByText('Add');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/lotteries'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Test Lottery',
            prize: '$1,000',
            type: 'simple',
          }),
        }),
      );
    });

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('should complete full flow: fill form, submit, and navigate back', async () => {
    const { getByPlaceholderText, getByText } = renderAddLotteryScreen();

    const nameInput = getByPlaceholderText('Lottery name');
    const prizeInput = getByPlaceholderText('Lottery prize');

    fireEvent.changeText(nameInput, 'Summer Jackpot');
    fireEvent(nameInput, 'blur');
    fireEvent.changeText(prizeInput, '$50,000');
    fireEvent(prizeInput, 'blur');

    await waitFor(() => {
      expect(nameInput.props.value).toBe('Summer Jackpot');
      expect(prizeInput.props.value).toBe('$50,000');
    });

    const addButton = getByText('Add');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/lotteries',
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});