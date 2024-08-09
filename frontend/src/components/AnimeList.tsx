import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { AnimeListProps } from '../Schema/Anime';

const AnimeList: React.FC<AnimeListProps> = ({ recommendations, loading, error }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <FlatList
      data={recommendations}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handlePress(item.url)}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center items vertically
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
  content: {
    fontSize: 14,
    color: '#d6e6ff',
  },
});

export default AnimeList;