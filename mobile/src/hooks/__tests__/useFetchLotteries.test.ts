import { renderHook, waitFor } from '@testing-library/react-native';
import { useFetchLotteries } from '../useFetchLotteries';
import { fetchLotteries } from '../../services';
import type { Lottery } from '../../types';

jest.mock('../../services', () => ({
  fetchLotteries: jest.fn(),
}));

const mockFetchLotteries = fetchLotteries as jest.MockedFunction<
  typeof fetchLotteries
>;

describe('useFetchLotteries', () => {
  const mockLotteries: Lottery[] = [
    {
      id: '1',
      name: 'Lottery 1',
      prize: '$1000',
      type: 'simple',
      status: 'running',
    },
    {
      id: '2',
      name: 'Lottery 2',
      prize: '$500',
      type: 'simple',
      status: 'finished',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should initialize with empty lotteries and loading state', () => {
    mockFetchLotteries.mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useFetchLotteries());

    expect(result.current.lotteries).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.loadLotteries).toBeInstanceOf(Function);
  });

  it('should fetch lotteries on mount', async () => {
    mockFetchLotteries.mockResolvedValue(mockLotteries);

    const { result } = renderHook(() => useFetchLotteries());

    expect(mockFetchLotteries).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.lotteries).toEqual(mockLotteries);
  });

  it('should set loading to false after successful fetch', async () => {
    mockFetchLotteries.mockResolvedValue(mockLotteries);

    const { result } = renderHook(() => useFetchLotteries());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.lotteries).toEqual(mockLotteries);
  });

  it('should handle fetch error and set loading to false', async () => {
    const errorMessage = 'Failed to fetch lotteries';
    mockFetchLotteries.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchLotteries());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.lotteries).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should allow manual reload via loadLotteries', async () => {
    mockFetchLotteries.mockResolvedValue(mockLotteries);

    const { result } = renderHook(() => useFetchLotteries());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockFetchLotteries).toHaveBeenCalledTimes(1);

    const updatedLotteries: Lottery[] = [
      {
        id: '3',
        name: 'Lottery 3',
        prize: '$2000',
        type: 'simple',
        status: 'running',
      },
    ];
    mockFetchLotteries.mockResolvedValue(updatedLotteries);

    await result.current.loadLotteries();

    await waitFor(() => {
      expect(result.current.lotteries).toEqual(updatedLotteries);
    });

    expect(mockFetchLotteries).toHaveBeenCalledTimes(2);
  });

  it('should return empty array when fetch returns empty data', async () => {
    mockFetchLotteries.mockResolvedValue([]);

    const { result } = renderHook(() => useFetchLotteries());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.lotteries).toEqual([]);
  });

  it('should maintain loadLotteries reference across renders', () => {
    mockFetchLotteries.mockResolvedValue(mockLotteries);

    const { result, rerender } = renderHook(() => useFetchLotteries());

    const firstLoadLotteries = result.current.loadLotteries;
    rerender({});
    const secondLoadLotteries = result.current.loadLotteries;

    expect(firstLoadLotteries).toBe(secondLoadLotteries);
  });
});
