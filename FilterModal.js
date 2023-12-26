// FilterModal.js
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const FilterModal = ({ isVisible, onClose, onSortByName, onSortByCount, onSortByPercentage, onSortByLowCount, onSortByLowPercentage }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onSortByName}>
          <Text>Sort by Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSortByCount}>
          <Text>Sort by High Count to Low Count</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSortByPercentage}>
          <Text>Sort by High Percentage to Low Percentage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSortByLowCount}>
          <Text>Sort by Low Count to High Count</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSortByLowPercentage}>
          <Text>Sort by Low Percentage to High Percentage</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 100,
    backgroundColor: 'white',
    padding: 20,
  },
});

export default FilterModal;
