import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { debounce } from '../utils/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterPress: () => void;
}

export const SearchBar = ({ onSearch, onFilterPress }: SearchBarProps) => {
  const debouncedSearch = debounce(onSearch, 500);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location..."
        onChangeText={debouncedSearch}
      />
      <Button
        title="Filters"
        onPress={onFilterPress}
        containerStyle={styles.filterButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: 'white',
  },
  filterButton: {
    width: 80,
  },
});