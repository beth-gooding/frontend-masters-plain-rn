import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ColourBox from '../components/ColourBox';

const ColourPalette = ({ route }) => {
  const renderItem = ({ item }) => (
    <ColourBox colourName={item.colorName} colourHex={item.hexCode} />
  );
  return (
    <View style={[styles.container]}>
      <FlatList
        data={route.params.colors}
        renderItem={renderItem}
        keyExtractor={(item) => item.colorName}
        ListHeaderComponent={
          <Text style={styles.title}>{route.params.paletteName}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 10,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
});

export default ColourPalette;
