import React from 'react';
import { render } from '@testing-library/react-native';
import SearchInput from '../SearchInput';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('SearchInput Snapshots', () => {
  it('should match snapshot with existing search term', () => {
    const mockOnChange = jest.fn();
    const { toJSON } = render(
      <SearchInput searchTerm="Summer Jackpot" onChange={mockOnChange} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
