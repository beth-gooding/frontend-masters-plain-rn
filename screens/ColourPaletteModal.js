import React from 'react';
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import COLORS from '../colours';

const ColourPaletteModal = ({ navigation }) => {
  const [colourPaletteName, setColourPaletteName] = useState('');
  const [selectedColours, setSelectedColours] = useState([]);
  const handleValueChange = useCallback((value, color) => {
    if (value === true) {
      setSelectedColours((colors) => [...colors, color]);
    } else {
      setSelectedColours((colors) =>
        colors.filter(
          (selectedColor) => color.colorName !== selectedColor.colorName,
        ),
      );
    }
  }, []);
  const handleSubmit = useCallback(() => {
    if (!colourPaletteName) {
      Alert.alert('Please enter a palette name');
    } else if (selectedColours.length < 3) {
      Alert.alert('Please choose at least three colours');
    } else {
      navigation.navigate('Home', {
        newColourPalette: {
          paletteName: colourPaletteName,
          colors: selectedColours,
        },
      });
    }
  }, [colourPaletteName, selectedColours, navigation]);
  return (
    <View style={styles.container}>
      <Text>Name your colour palette</Text>
      <TextInput
        style={styles.input}
        value={colourPaletteName}
        onChangeText={setColourPaletteName}
      />
      <FlatList
        style={styles.list}
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.switchContainer}>
            <Text>{item.colorName}</Text>
            <View style={styles.rightHandSide}>
              <View style={[styles.box, { backgroundColor: item.hexCode }]} />
              <Switch
                trackColor={{ false: 'grey', true: 'green' }}
                ios_backgroundColor="white"
                onValueChange={(selected) => {
                  handleValueChange(selected, item);
                }}
                value={
                  !!selectedColours.find(
                    (color) => color.colorName === item.colorName,
                  )
                }
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.submit}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.submitText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  submit: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  list: {
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
  rightHandSide: {
    flexDirection: 'row',
  },
});

export default ColourPaletteModal;
