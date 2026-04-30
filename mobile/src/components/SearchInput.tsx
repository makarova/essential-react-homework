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
    <View>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="search"
          size={18}
          color="black"
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    paddingVertical: 16,
    paddingLeft: 10,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
});
