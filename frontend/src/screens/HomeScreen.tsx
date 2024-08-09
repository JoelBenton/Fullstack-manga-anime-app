import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MangaList from '../components/MangaList';
import AnimeList from '../components/AnimeList';
import { useFetchMangaRecommendations, useFetchAnimeRecommendations } from '../hooks/useFetchRecomendations';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Manga' | 'Anime'>('Manga');

  const { recommendations: mangaRecommendations, loading: mangaLoading, error: mangaError } = useFetchMangaRecommendations();
  const { recommendations: animeRecommendations, loading: animeLoading, error: animeError } = useFetchAnimeRecommendations();

  const handleCategoryChange = (category: 'Manga' | 'Anime') => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Manga' && styles.selectedButton]}
          onPress={() => handleCategoryChange('Manga')}
        >
          <Text style={styles.buttonText}>Manga</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Anime' && styles.selectedButton]}
          onPress={() => handleCategoryChange('Anime')}
        >
          <Text style={styles.buttonText}>Anime</Text>
        </TouchableOpacity>
      </View>

      {selectedCategory === 'Manga' ? (
        <MangaList recommendations={mangaRecommendations} loading={mangaLoading} error={mangaError} />
      ) : (
        <AnimeList recommendations={animeRecommendations} loading={animeLoading} error={animeError} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#000',
  },
  selectedButton: {
    backgroundColor: '#6200ee',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;