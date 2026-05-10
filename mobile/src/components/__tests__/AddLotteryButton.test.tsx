import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddLotteryButton from '../AddLotteryButton';

describe('AddLotteryButton', () => {
  it('should render a button', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(<AddLotteryButton onPress={mockOnPress} />);

    const button = getByRole('button');
    expect(button).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(<AddLotteryButton onPress={mockOnPress} />);

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
