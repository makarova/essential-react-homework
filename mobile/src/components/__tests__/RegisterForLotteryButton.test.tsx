import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterForLotteryButton from '../RegisterForLotteryButton';

describe('RegisterForLotteryButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Register button with correct accessibility role', () => {
    const { getByRole } = render(
      <RegisterForLotteryButton onPress={mockOnPress} isDisabled={false} />,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('should call onPress when button is pressed and enabled', () => {
    const { getByRole } = render(
      <RegisterForLotteryButton onPress={mockOnPress} isDisabled={false} />,
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(false);

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when button is pressed and disabled', () => {
    const { getByRole } = render(
      <RegisterForLotteryButton onPress={mockOnPress} isDisabled={true} />,
    );

    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);

    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
