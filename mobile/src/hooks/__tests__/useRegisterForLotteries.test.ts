import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useRegisterForLotteries } from '../useRegisterForLotteries';
import { registerForLottery } from '../../services';
import { addToStoredRegisteredLotteryIds } from '../../services/asyncStorageService';

jest.mock('../../services', () => ({
  registerForLottery: jest.fn(),
}));

jest.mock('../../services/asyncStorageService', () => ({
  addToStoredRegisteredLotteryIds: jest.fn(),
}));

const mockRegisterForLottery = registerForLottery as jest.MockedFunction<
  typeof registerForLottery
>;
const mockAddToStoredRegisteredLotteryIds =
  addToStoredRegisteredLotteryIds as jest.MockedFunction<
    typeof addToStoredRegisteredLotteryIds
  >;

describe('useRegisterForLotteries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set loading state during registration', async () => {
    mockRegisterForLottery.mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useRegisterForLotteries());

    const mockCallback = jest.fn();

    act(() => {
      void result.current.registerForLotteries(
        'John Doe',
        ['lottery-1'],
        mockCallback,
      );
    });

    await waitFor(() => {
      expect(result.current.registerInProgress).toBe(true);
    });
  });

  it('should successfully register for single lottery', async () => {
    const mockLotteries = [
      {
        id: 'lottery-1',
        name: 'Test Lottery',
        prize: '$1000',
        type: 'simple' as const,
        status: 'running' as const,
      },
    ];

    mockRegisterForLottery.mockResolvedValue(mockLotteries);
    mockAddToStoredRegisteredLotteryIds.mockResolvedValue();

    const { result } = renderHook(() => useRegisterForLotteries());

    const mockCallback = jest.fn();

    await act(async () => {
      await result.current.registerForLotteries(
        'John Doe',
        ['lottery-1'],
        mockCallback,
      );
    });

    expect(result.current.registerInProgress).toBe(false);
    expect(result.current.registerSuccess).toBe(true);
    expect(result.current.registerError).toBeNull();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockRegisterForLottery).toHaveBeenCalledWith({
      name: 'John Doe',
      lotteryId: 'lottery-1',
    });
    expect(mockAddToStoredRegisteredLotteryIds).toHaveBeenCalledWith([
      'lottery-1',
    ]);
  });

  it('should successfully register for multiple lotteries', async () => {
    mockRegisterForLottery.mockResolvedValue([]);
    mockAddToStoredRegisteredLotteryIds.mockResolvedValue();

    const { result } = renderHook(() => useRegisterForLotteries());

    const mockCallback = jest.fn();

    await act(async () => {
      await result.current.registerForLotteries(
        'Jane Smith',
        ['lottery-1', 'lottery-2', 'lottery-3'],
        mockCallback,
      );
    });

    expect(result.current.registerInProgress).toBe(false);
    expect(result.current.registerSuccess).toBe(true);
    expect(mockRegisterForLottery).toHaveBeenCalledTimes(3);
    expect(mockRegisterForLottery).toHaveBeenCalledWith({
      name: 'Jane Smith',
      lotteryId: 'lottery-1',
    });
    expect(mockRegisterForLottery).toHaveBeenCalledWith({
      name: 'Jane Smith',
      lotteryId: 'lottery-2',
    });
    expect(mockRegisterForLottery).toHaveBeenCalledWith({
      name: 'Jane Smith',
      lotteryId: 'lottery-3',
    });
    expect(mockAddToStoredRegisteredLotteryIds).toHaveBeenCalledWith([
      'lottery-1',
      'lottery-2',
      'lottery-3',
    ]);
  });

  it('should handle registration error', async () => {
    const errorMessage = 'Failed to register for lottery';
    mockRegisterForLottery.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useRegisterForLotteries());

    const mockCallback = jest.fn();

    await act(async () => {
      await expect(
        result.current.registerForLotteries(
          'John Doe',
          ['lottery-1'],
          mockCallback,
        ),
      ).rejects.toThrow(errorMessage);
    });

    expect(result.current.registerInProgress).toBe(false);
    expect(result.current.registerSuccess).toBe(false);
    expect(result.current.registerError).toBe(errorMessage);
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should not store to AsyncStorage if registration fails', async () => {
    mockRegisterForLottery.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useRegisterForLotteries());

    await act(async () => {
      await expect(
        result.current.registerForLotteries(
          'John Doe',
          ['lottery-1'],
          jest.fn(),
        ),
      ).rejects.toThrow();
    });

    expect(result.current.registerInProgress).toBe(false);
    expect(mockAddToStoredRegisteredLotteryIds).not.toHaveBeenCalled();
  });

  it('should reset state when resetRegisterState is called', async () => {
    mockRegisterForLottery.mockResolvedValue([]);
    mockAddToStoredRegisteredLotteryIds.mockResolvedValue();

    const { result } = renderHook(() => useRegisterForLotteries());

    await act(async () => {
      await result.current.registerForLotteries(
        'John Doe',
        ['lottery-1'],
        jest.fn(),
      );
    });

    expect(result.current.registerSuccess).toBe(true);

    act(() => {
      result.current.resetRegisterState();
    });

    expect(result.current.registerSuccess).toBe(false);
    expect(result.current.registerError).toBeNull();
  });

  it('should set loading to false after error', async () => {
    mockRegisterForLottery.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useRegisterForLotteries());

    await act(async () => {
      await expect(
        result.current.registerForLotteries(
          'John Doe',
          ['lottery-1'],
          jest.fn(),
        ),
      ).rejects.toThrow();
    });

    expect(result.current.registerInProgress).toBe(false);
  });

  it('should handle empty lottery array', async () => {
    mockRegisterForLottery.mockResolvedValue([]);
    mockAddToStoredRegisteredLotteryIds.mockResolvedValue();

    const { result } = renderHook(() => useRegisterForLotteries());

    const mockCallback = jest.fn();

    await act(async () => {
      await result.current.registerForLotteries('John Doe', [], mockCallback);
    });

    expect(result.current.registerInProgress).toBe(false);
    expect(result.current.registerSuccess).toBe(true);
    expect(mockRegisterForLottery).not.toHaveBeenCalled();
    expect(mockAddToStoredRegisteredLotteryIds).toHaveBeenCalledWith([]);
    expect(mockCallback).toHaveBeenCalled();
  });
});
