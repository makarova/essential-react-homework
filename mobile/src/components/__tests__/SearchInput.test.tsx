import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchInput from '../SearchInput';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('SearchInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input with placeholder text', () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" onChange={mockOnChange} />,
    );
    const input = getByPlaceholderText('Filter lotteries');

    expect(input).toBeTruthy();
    expect(input.props.value).toBe('');
  });

  it('should call onChange with correct text when user types', () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Filter lotteries');
    fireEvent.changeText(input, 'test lottery');

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test lottery');
  });

  it('should display the current searchTerm value', () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="existing search" onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Filter lotteries');
    expect(input.props.value).toBe('existing search');
  });

  it('should update value when searchTerm prop changes', () => {
    const { getByPlaceholderText, rerender } = render(
      <SearchInput searchTerm="" onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Filter lotteries');
    expect(input.props.value).toBe('');

    rerender(<SearchInput searchTerm="new search" onChange={mockOnChange} />);

    expect(input.props.value).toBe('new search');
  });

  it('should call onChange multiple times for multiple text changes', () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Filter lotteries');

    fireEvent.changeText(input, 'a');
    fireEvent.changeText(input, 'ab');
    fireEvent.changeText(input, 'abc');

    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(mockOnChange).toHaveBeenNthCalledWith(1, 'a');
    expect(mockOnChange).toHaveBeenNthCalledWith(2, 'ab');
    expect(mockOnChange).toHaveBeenNthCalledWith(3, 'abc');
  });
});
