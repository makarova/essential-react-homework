import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LotteryCard } from '../LotteryCard';
import { Lottery } from '../../types';

describe('LotteryCard', () => {
  const mockUpdateSelection = jest.fn();
  const mockCheckIsSelected = jest.fn();
  const mockCheckIsRegistered = jest.fn();

  const mockLottery: Lottery = {
    id: 'lottery-1',
    name: 'Test Lottery',
    prize: '$1000',
    type: 'regular',
    status: 'running',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckIsSelected.mockReturnValue(false);
    mockCheckIsRegistered.mockReturnValue(false);
  });

  it('should render lottery name, prize, and ID', () => {
    const { getByText } = render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    expect(getByText('Test Lottery')).toBeTruthy();
    expect(getByText('$1000')).toBeTruthy();
    expect(getByText('lottery-1')).toBeTruthy();
  });

  it('should call updateSelection with lottery ID when pressed and enabled', () => {
    const { getByRole } = render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockUpdateSelection).toHaveBeenCalledTimes(1);
    expect(mockUpdateSelection).toHaveBeenCalledWith('lottery-1');
  });

  it('should not call updateSelection when pressed and lottery is finished', () => {
    const finishedLottery: Lottery = {
      ...mockLottery,
      status: 'finished',
    };

    const { getByRole } = render(
      <LotteryCard
        lottery={finishedLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockUpdateSelection).not.toHaveBeenCalled();
  });

  it('should not call updateSelection when pressed and lottery is registered', () => {
    mockCheckIsRegistered.mockReturnValue(true);

    const { getByRole } = render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockUpdateSelection).not.toHaveBeenCalled();
  });

  it('should be disabled when status is finished', () => {
    const finishedLottery: Lottery = {
      ...mockLottery,
      status: 'finished',
    };

    const { getByRole } = render(
      <LotteryCard
        lottery={finishedLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
  });

  it('should be disabled when lottery is registered', () => {
    mockCheckIsRegistered.mockReturnValue(true);

    const { getByRole } = render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
  });

  it('should be enabled when status is running and not registered', () => {
    const { getByRole } = render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(false);
  });

  it('should call checkIsSelected with lottery ID', () => {
    render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    expect(mockCheckIsSelected).toHaveBeenCalledWith('lottery-1');
  });

  it('should call checkIsRegistered with lottery ID', () => {
    render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    expect(mockCheckIsRegistered).toHaveBeenCalledWith('lottery-1');
  });

  it('should handle selection state changes correctly', () => {
    mockCheckIsSelected.mockReturnValue(true);

    const { getByRole } = render(
      <LotteryCard
        lottery={mockLottery}
        checkIsSelected={mockCheckIsSelected}
        checkIsRegistered={mockCheckIsRegistered}
        updateSelection={mockUpdateSelection}
      />,
    );

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockUpdateSelection).toHaveBeenCalledWith('lottery-1');
  });
});
