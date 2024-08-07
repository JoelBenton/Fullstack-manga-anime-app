import React from 'react';
import { View, StyleSheet } from 'react-native';
import MangaList from '../components/MangaList';
import { useFetchMangaRecommendations } from '../hooks/useFetchMangaRecomendations';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const { recommendations, loading, error } = useFetchMangaRecommendations();

  return (
    <SafeAreaView style={styles.container}>
      <MangaList recommendations={recommendations} loading={loading} error={error} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;