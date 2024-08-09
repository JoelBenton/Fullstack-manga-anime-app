import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MangaList from '../components/MangaList';
import AnimeList from '../components/AnimeList';
import { useFetchMangaRecommendations, useFetchAnimeRecommendations } from '../hooks/useFetchRecomendations';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Manga' | 'Anime'>('Manga');

  // Fetch data based on selected category
  const { recommendations: mangaRecommendations, loading: mangaLoading, error: mangaError } = useFetchMangaRecommendations();
  const { recommendations: animeRecommendations, loading: animeLoading, error: animeError } = useFetchAnimeRecommendations();

  const handleCategoryChange = (category: 'Manga' | 'Anime') => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Selection Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Manga"
          onPress={() => handleCategoryChange('Manga')}
          color={selectedCategory === 'Manga' ? '#6200ee' : '#000'}
        />
        <Button
          title="Anime"
          onPress={() => handleCategoryChange('Anime')}
          color={selectedCategory === 'Anime' ? '#6200ee' : '#000'}
        />
      </View>

      {/* Conditionally render MangaList or AnimeList based on selected category */}
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});

export default HomeScreen;