import { renderHook, waitFor } from '@testing-library/react-native';
import { useRegisteredLotteries } from '../useRegisteredLotteries';
import { getStoredRegisteredLotteryIds } from '../../services/asyncStorageService';

jest.mock('../../services/asyncStorageService', () => ({
  getStoredRegisteredLotteryIds: jest.fn(),
}));

const mockGetStoredRegisteredLotteryIds =
  getStoredRegisteredLotteryIds as jest.MockedFunction<
    typeof getStoredRegisteredLotteryIds
  >;

describe('useRegisteredLotteries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should initialize with empty registered lotteries', () => {
    mockGetStoredRegisteredLotteryIds.mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useRegisteredLotteries());

    expect(result.current.isLotteryRegistered('lottery-1')).toBe(false);
    expect(result.current.fetchRegisteredLotteries).toBeInstanceOf(Function);
  });

  it('should fetch registered lotteries on mount', async () => {
    const mockRegistered = ['lottery-1', 'lottery-2'];
    mockGetStoredRegisteredLotteryIds.mockResolvedValue(mockRegistered);

    const { result } = renderHook(() => useRegisteredLotteries());

    expect(mockGetStoredRegisteredLotteryIds).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.isLotteryRegistered('lottery-1')).toBe(true);
    });

    expect(result.current.isLotteryRegistered('lottery-2')).toBe(true);
    expect(result.current.isLotteryRegistered('lottery-3')).toBe(false);
  });

  it('should return false for unregistered lottery', async () => {
    mockGetStoredRegisteredLotteryIds.mockResolvedValue(['lottery-1']);

    const { result } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => {
      expect(result.current.isLotteryRegistered('lottery-1')).toBe(true);
    });

    expect(result.current.isLotteryRegistered('lottery-2')).toBe(false);
  });

  it('should handle empty registered lotteries', async () => {
    mockGetStoredRegisteredLotteryIds.mockResolvedValue([]);

    const { result } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => {
      expect(mockGetStoredRegisteredLotteryIds).toHaveBeenCalled();
    });

    expect(result.current.isLotteryRegistered('lottery-1')).toBe(false);
  });

  it('should handle fetch error gracefully', async () => {
    const errorMessage = 'Failed to fetch registered lotteries';
    mockGetStoredRegisteredLotteryIds.mockRejectedValue(
      new Error(errorMessage),
    );

    const { result } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(errorMessage);
    });

    expect(result.current.isLotteryRegistered('lottery-1')).toBe(false);
  });

  it('should allow manual refetch via fetchRegisteredLotteries', async () => {
    mockGetStoredRegisteredLotteryIds.mockResolvedValue(['lottery-1']);

    const { result } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => {
      expect(result.current.isLotteryRegistered('lottery-1')).toBe(true);
    });

    expect(mockGetStoredRegisteredLotteryIds).toHaveBeenCalledTimes(1);

    mockGetStoredRegisteredLotteryIds.mockResolvedValue([
      'lottery-1',
      'lottery-2',
    ]);

    await result.current.fetchRegisteredLotteries();

    await waitFor(() => {
      expect(result.current.isLotteryRegistered('lottery-2')).toBe(true);
    });

    expect(mockGetStoredRegisteredLotteryIds).toHaveBeenCalledTimes(2);
  });

  it('should maintain fetchRegisteredLotteries reference across renders', async () => {
    mockGetStoredRegisteredLotteryIds.mockResolvedValue([]);

    const { result, rerender } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => {
      expect(mockGetStoredRegisteredLotteryIds).toHaveBeenCalled();
    });

    const firstFetch = result.current.fetchRegisteredLotteries;
    rerender({});
    const secondFetch = result.current.fetchRegisteredLotteries;

    expect(firstFetch).toBe(secondFetch);
  });

  it('should update isLotteryRegistered when registered lotteries change', async () => {
    mockGetStoredRegisteredLotteryIds.mockResolvedValue(['lottery-1']);

    const { result } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => {
      expect(result.current.isLotteryRegistered('lottery-1')).toBe(true);
    });

    expect(result.current.isLotteryRegistered('lottery-2')).toBe(false);

    mockGetStoredRegisteredLotteryIds.mockResolvedValue([
      'lottery-1',
      'lottery-2',
      'lottery-3',
    ]);

    await result.current.fetchRegisteredLotteries();

    await waitFor(() => {
      expect(result.current.isLotteryRegistered('lottery-2')).toBe(true);
      expect(result.current.isLotteryRegistered('lottery-3')).toBe(true);
    });
  });
});
