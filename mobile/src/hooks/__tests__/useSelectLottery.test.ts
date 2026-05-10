import { renderHook, act } from '@testing-library/react-native';
import { useSelectLottery } from '../useSelectLottery';

describe('useSelectLottery', () => {
  it('should select a lottery when not already selected', () => {
    const { result } = renderHook(() => useSelectLottery());

    act(() => {
      result.current.handleLotterySelected('lottery-1');
    });

    expect(result.current.selectedLotteryIds).toEqual(['lottery-1']);
    expect(result.current.isLotterySelected('lottery-1')).toBe(true);
  });

  it('should deselect a lottery when already selected', () => {
    const { result } = renderHook(() => useSelectLottery());

    act(() => {
      result.current.handleLotterySelected('lottery-1');
    });

    expect(result.current.isLotterySelected('lottery-1')).toBe(true);

    act(() => {
      result.current.handleLotterySelected('lottery-1');
    });

    expect(result.current.selectedLotteryIds).toEqual([]);
    expect(result.current.isLotterySelected('lottery-1')).toBe(false);
  });

  it('should select multiple lotteries', () => {
    const { result } = renderHook(() => useSelectLottery());

    act(() => {
      result.current.handleLotterySelected('lottery-1');
    });

    act(() => {
      result.current.handleLotterySelected('lottery-2');
    });

    act(() => {
      result.current.handleLotterySelected('lottery-3');
    });

    expect(result.current.selectedLotteryIds).toEqual([
      'lottery-1',
      'lottery-2',
      'lottery-3',
    ]);
    expect(result.current.isLotterySelected('lottery-1')).toBe(true);
    expect(result.current.isLotterySelected('lottery-2')).toBe(true);
    expect(result.current.isLotterySelected('lottery-3')).toBe(true);
  });

  it('should deselect one lottery from multiple selected lotteries', () => {
    const { result } = renderHook(() => useSelectLottery());

    act(() => {
      result.current.handleLotterySelected('lottery-1');
    });

    act(() => {
      result.current.handleLotterySelected('lottery-2');
    });

    act(() => {
      result.current.handleLotterySelected('lottery-3');
    });

    act(() => {
      result.current.handleLotterySelected('lottery-2');
    });

    expect(result.current.selectedLotteryIds).toEqual([
      'lottery-1',
      'lottery-3',
    ]);
    expect(result.current.isLotterySelected('lottery-2')).toBe(false);
  });

  it('should reset all selected lotteries', () => {
    const { result } = renderHook(() => useSelectLottery());

    act(() => {
      result.current.handleLotterySelected('lottery-1');
    });

    act(() => {
      result.current.handleLotterySelected('lottery-2');
    });

    expect(result.current.selectedLotteryIds).toEqual([
      'lottery-1',
      'lottery-2',
    ]);

    act(() => {
      result.current.resetSelectedLotteries();
    });

    expect(result.current.selectedLotteryIds).toEqual([]);
    expect(result.current.isLotterySelected('lottery-1')).toBe(false);
    expect(result.current.isLotterySelected('lottery-2')).toBe(false);
  });

  it('should maintain resetSelectedLotteries reference across renders', () => {
    const { result, rerender } = renderHook(() => useSelectLottery());

    const firstResetFn = result.current.resetSelectedLotteries;
    rerender({});
    const secondResetFn = result.current.resetSelectedLotteries;

    expect(firstResetFn).toBe(secondResetFn);
  });
});
