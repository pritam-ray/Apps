import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Text, Button, Slider } from '@rneui/themed';

export const FilterModal = ({ visible, onClose, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text h4 style={styles.title}>Filters</Text>

          <Text style={styles.label}>Price Range</Text>
          <View style={styles.sliderContainer}>
            <Slider
              value={localFilters.minPrice}
              onValueChange={(value) => setLocalFilters({ ...localFilters, minPrice: value })}
              minimumValue={0}
              maximumValue={1000}
              step={10}
            />
            <Text>${localFilters.minPrice} - ${localFilters.maxPrice}</Text>
          </View>

          <Text style={styles.label}>Minimum Rating</Text>
          <View style={styles.sliderContainer}>
            <Slider
              value={localFilters.minRating}
              onValueChange={(value) => setLocalFilters({ ...localFilters, minRating: value })}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
            />
            <Text>{localFilters.minRating} stars</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              type="outline"
              containerStyle={styles.button}
            />
            <Button
              title="Apply"
              onPress={handleApply}
              containerStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
});