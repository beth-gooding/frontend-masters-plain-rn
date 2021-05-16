import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColourBox = ({ colourName, colourHex }) => {
  const boxColour = {
    backgroundColor: colourHex,
  };
  const textColour = {
    color:
      parseInt(colourHex.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };
  return (
    <View style={[boxColour, styles.colourContainer]}>
      <Text style={[styles.white, textColour]}>
        {colourName}: {colourHex}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  white: {
    color: 'white',
    fontWeight: 'bold',
  },
  colourContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 3,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
});

export default ColourBox;
