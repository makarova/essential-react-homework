import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddLotteryForm from '../AddLotteryForm';

describe('AddLotteryForm', () => {
  const mockCreateLottery = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form inputs', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    expect(getByText('Add a new lottery')).toBeTruthy();
    expect(getByLabelText('Close')).toBeTruthy();
    expect(getByPlaceholderText('Lottery name')).toBeTruthy();
    expect(getByPlaceholderText('Lottery prize')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('should call onClose when close button is pressed', () => {
    const { getByLabelText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    const closeButton = getByLabelText('Close');
    fireEvent.press(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should update lottery name input when user types', () => {
    const { getByPlaceholderText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    const nameInput = getByPlaceholderText('Lottery name');
    fireEvent.changeText(nameInput, 'Test Lottery');

    expect(nameInput.props.value).toBe('Test Lottery');
  });

  it('should update lottery prize input when user types', () => {
    const { getByPlaceholderText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    const prizeInput = getByPlaceholderText('Lottery prize');
    fireEvent.changeText(prizeInput, '$1000');

    expect(prizeInput.props.value).toBe('$1000');
  });

  it('should show validation errors when form is submitted with empty fields', async () => {
    const { getByText, findAllByText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    const submitButton = getByText('Add');
    fireEvent.press(submitButton);

    const errors = await findAllByText('This field is required');
    expect(errors).toHaveLength(2);
  });

  it('should call createLottery with correct data when form is valid', async () => {
    mockCreateLottery.mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    const nameInput = getByPlaceholderText('Lottery name');
    const prizeInput = getByPlaceholderText('Lottery prize');
    const submitButton = getByText('Add');

    fireEvent.changeText(nameInput, 'Test Lottery');
    fireEvent(nameInput, 'blur');
    fireEvent.changeText(prizeInput, '$1000');
    fireEvent(prizeInput, 'blur');

    await waitFor(() => {
      expect(nameInput.props.value).toBe('Test Lottery');
      expect(prizeInput.props.value).toBe('$1000');
    });

    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(mockCreateLottery).toHaveBeenCalledWith({
          name: 'Test Lottery',
          prize: '$1000',
        });
      },
      { timeout: 2000 },
    );
  });

  it('should call onClose after successful form submission', async () => {
    mockCreateLottery.mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={false}
      />,
    );

    const nameInput = getByPlaceholderText('Lottery name');
    const prizeInput = getByPlaceholderText('Lottery prize');
    const submitButton = getByText('Add');

    fireEvent.changeText(nameInput, 'Test Lottery');
    fireEvent(nameInput, 'blur');
    fireEvent.changeText(prizeInput, '$1000');
    fireEvent(prizeInput, 'blur');

    await waitFor(() => {
      expect(nameInput.props.value).toBe('Test Lottery');
      expect(prizeInput.props.value).toBe('$1000');
    });

    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 2000 },
    );
  });

  it('should show loading indicator when loading is true', () => {
    const { queryByText } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={true}
      />,
    );

    expect(queryByText('Add')).toBeNull();
  });

  it('should disable submit button when loading is true', () => {
    const { getAllByRole } = render(
      <AddLotteryForm
        createLottery={mockCreateLottery}
        onClose={mockOnClose}
        loading={true}
      />,
    );

    const buttons = getAllByRole('button');
    const submitButton = buttons.find(
      (button) => button.props.accessibilityState?.disabled === true,
    );

    expect(submitButton).toBeTruthy();
    expect(submitButton?.props.accessibilityState.disabled).toBe(true);
  });
});
