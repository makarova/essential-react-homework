import { renderHook, act } from '@testing-library/react-native';
import { useSearchLotteries } from '../useSearchLotteries';
import type { Lottery } from '../../types';

describe('useSearchLotteries', () => {
  const mockLotteries: Lottery[] = [
    {
      id: '1',
      name: 'Summer Jackpot',
      prize: '$10,000',
      type: 'simple',
      status: 'running',
    },
    {
      id: '2',
      name: 'Winter Bonus',
      prize: '$5,000',
      type: 'simple',
      status: 'running',
    },
    {
      id: '3',
      name: 'Spring Special',
      prize: '$7,500',
      type: 'simple',
      status: 'finished',
    },
  ];

  it('should filter lotteries by search term', () => {
    const { result } = renderHook(() => useSearchLotteries(mockLotteries));

    act(() => {
      result.current.onSearchChange('Summer');
    });

    expect(result.current.searchTerm).toBe('Summer');
    expect(result.current.matchingLotteries).toEqual([mockLotteries[0]]);
  });

  it('should filter lotteries case-insensitively', () => {
    const { result } = renderHook(() => useSearchLotteries(mockLotteries));

    act(() => {
      result.current.onSearchChange('winter');
    });

    expect(result.current.matchingLotteries).toEqual([mockLotteries[1]]);
  });

  it('should return multiple matching lotteries', () => {
    const { result } = renderHook(() => useSearchLotteries(mockLotteries));

    act(() => {
      result.current.onSearchChange('special');
    });

    expect(result.current.matchingLotteries).toHaveLength(1);
    expect(result.current.matchingLotteries).toEqual([mockLotteries[2]]);
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useSearchLotteries(mockLotteries));

    act(() => {
      result.current.onSearchChange('NonExistent');
    });

    expect(result.current.matchingLotteries).toEqual([]);
  });

  it('should update matching lotteries when search term changes', () => {
    const { result } = renderHook(() => useSearchLotteries(mockLotteries));

    act(() => {
      result.current.onSearchChange('Summer');
    });

    expect(result.current.matchingLotteries).toHaveLength(1);

    act(() => {
      result.current.onSearchChange('Winter');
    });

    expect(result.current.matchingLotteries).toHaveLength(1);
    expect(result.current.matchingLotteries[0].name).toBe('Winter Bonus');
  });

  it('should reset to all lotteries when search term is cleared', () => {
    const { result } = renderHook(() => useSearchLotteries(mockLotteries));

    act(() => {
      result.current.onSearchChange('Summer');
    });

    expect(result.current.matchingLotteries).toHaveLength(1);

    act(() => {
      result.current.onSearchChange('');
    });

    expect(result.current.matchingLotteries).toEqual(mockLotteries);
  });

  it('should handle empty lottery data', () => {
    const { result } = renderHook(() => useSearchLotteries([]));

    expect(result.current.matchingLotteries).toEqual([]);

    act(() => {
      result.current.onSearchChange('test');
    });

    expect(result.current.matchingLotteries).toEqual([]);
  });

  it('should update results when lottery data changes', () => {
    const { result, rerender } = renderHook(
      ({ data }: { data: Lottery[] }) => useSearchLotteries(data),
      {
        initialProps: { data: mockLotteries },
      },
    );

    expect(result.current.matchingLotteries).toHaveLength(3);

    const newLotteries = [mockLotteries[0]];
    rerender({ data: newLotteries });

    expect(result.current.matchingLotteries).toHaveLength(1);
  });

  it('should maintain onSearchChange reference across renders', () => {
    const { result, rerender } = renderHook(() =>
      useSearchLotteries(mockLotteries),
    );

    const firstOnSearchChange = result.current.onSearchChange;
    rerender({});
    const secondOnSearchChange = result.current.onSearchChange;

    expect(firstOnSearchChange).toBe(secondOnSearchChange);
  });
});
