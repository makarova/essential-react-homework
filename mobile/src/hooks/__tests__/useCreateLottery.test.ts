import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useCreateLottery } from '../useCreateLottery';
import { createLottery } from '../../services';

jest.mock('../../services', () => ({
  createLottery: jest.fn(),
}));

const mockCreateLottery = createLottery as jest.MockedFunction<
  typeof createLottery
>;

describe('useCreateLottery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCreateLottery());

    expect(result.current.lotterySuccess).toBe(false);
    expect(result.current.createInProgress).toBe(false);
    expect(result.current.createError).toBeNull();
    expect(result.current.create).toBeInstanceOf(Function);
    expect(result.current.resetAddLotteryState).toBeInstanceOf(Function);
  });

  it('should set loading state during API call', async () => {
    mockCreateLottery.mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useCreateLottery());

    const mockCallback = jest.fn();

    act(() => {
      void result.current.create(
        { name: 'Test Lottery', prize: '$1000' },
        mockCallback,
      );
    });

    await waitFor(() => {
      expect(result.current.createInProgress).toBe(true);
    });
  });

  it('should successfully create lottery and call callback', async () => {
    const mockLottery = {
      id: '1',
      name: 'Test Lottery',
      prize: '$1000',
      type: 'simple' as const,
      status: 'running' as const,
    };

    mockCreateLottery.mockResolvedValue(mockLottery);

    const { result } = renderHook(() => useCreateLottery());

    const mockCallback = jest.fn();

    await act(async () => {
      await result.current.create(
        { name: 'Test Lottery', prize: '$1000' },
        mockCallback,
      );
    });

    expect(result.current.createInProgress).toBe(false);
    expect(result.current.lotterySuccess).toBe(true);
    expect(result.current.createError).toBeNull();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCreateLottery).toHaveBeenCalledWith({
      name: 'Test Lottery',
      prize: '$1000',
    });
  });

  it('should handle error during lottery creation', async () => {
    const errorMessage = 'Failed to create lottery';
    mockCreateLottery.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCreateLottery());

    const mockCallback = jest.fn();

    await act(async () => {
      await result.current.create(
        { name: 'Test Lottery', prize: '$1000' },
        mockCallback,
      );
    });

    expect(result.current.createInProgress).toBe(false);
    expect(result.current.lotterySuccess).toBe(false);
    expect(result.current.createError).toBe(errorMessage);
  });

  it('should reset state when resetAddLotteryState is called', async () => {
    mockCreateLottery.mockResolvedValue({
      id: '1',
      name: 'Test Lottery',
      prize: '$1000',
      type: 'simple',
      status: 'running',
    });

    const { result } = renderHook(() => useCreateLottery());

    await act(async () => {
      await result.current.create(
        { name: 'Test Lottery', prize: '$1000' },
        jest.fn(),
      );
    });

    expect(result.current.lotterySuccess).toBe(true);

    act(() => {
      result.current.resetAddLotteryState();
    });

    expect(result.current.lotterySuccess).toBe(false);
    expect(result.current.createError).toBeNull();
  });

  it('should set loading to false after error', async () => {
    mockCreateLottery.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCreateLottery());

    await act(async () => {
      await result.current.create(
        { name: 'Test Lottery', prize: '$1000' },
        jest.fn(),
      );
    });

    expect(result.current.createInProgress).toBe(false);
  });
});
