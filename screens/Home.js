import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
  const newColourPalette = route.params
    ? route.params.newColourPalette
    : undefined;
  const [colourPalettes, setColourPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFetchColourPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    const newColourPalettes = await result.json();
    if (result.ok) {
      setColourPalettes(newColourPalettes);
    }
  }, []);

  useEffect(() => {
    handleFetchColourPalettes();
  }, [handleFetchColourPalettes]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetch('https://color-palette-api.kadikraman.vercel.app/palettes');
    setTimeout(() => {
      setIsRefreshing(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (newColourPalette) {
      setColourPalettes((palettes) => [newColourPalette, ...palettes]);
    }
  }, [newColourPalette]);

  return (
    <FlatList
      style={styles.list}
      data={colourPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <View>
          <PalettePreview
            handlePress={() => {
              navigation.navigate('Colour Palette', item);
            }}
            colourPalette={item}
          />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => handleRefresh()}
        />
      }
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Make a new colour scheme');
          }}
        >
          <Text style={styles.buttonText}>Add a colour scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 15,
  },
});

export default Home;
