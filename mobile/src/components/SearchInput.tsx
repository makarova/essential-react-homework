import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { colors } from '../colors';

interface SearchInputProps {
  searchTerm: string;
  onChange: (searchTerm: string) => void;
}

export default function SearchInput({
  searchTerm,
  onChange,
}: SearchInputProps) {
  return (
    <View style={styles.inputContainer}>
      <MaterialIcons
        name="search"
        size={20}
        color={colors.grey}
        style={styles.icon}
      />
      <TextInput
        accessibilityLabel="Text input field"
        placeholder="Filter lotteries"
        style={styles.input}
        onChangeText={onChange}
        value={searchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 16,
    fontSize: 16,
  },
  icon: {
    paddingLeft: 12,
    paddingRight: 8,
  },
});
