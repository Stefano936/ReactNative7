import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { searchMovieByTitle } from './utils/api';
import { useState } from 'react';

export default function App() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)
  
  const handleSearch = async () => {
    setResult(null)
    if (search === '') return;
    console.log(`Searching movie with title: ${search}`);

    const movie = await searchMovieByTitle(search);
    setResult(movie);

    console.log(movie.Poster);
  }
  
  return (
    <View style={styles.searcher}>
      <Text style={styles.searcher__title}>Movie Search</Text>

      <View style={styles.searcher__input}>
        <TextInput
          placeholder="Search for a movie"
          style={styles.searcher__input__field}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />

        <Button title="Search" onPress={handleSearch} />
      </View>

      {result != null ? <View style={styles.searcher__results}>
        <Text style={styles.result__title}>{result.Title} ({result.Year})</Text>

        <Image style={styles.result__poster} source={{ uri: result.Poster }} />
        <Text style={styles.result__plot}>{result.Plot}</Text>
      </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searcher: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  searcher__title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3c4858',
    marginBottom: 20,
    textAlign: 'center',
  },

  searcher__input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  searcher__input__field: {
    padding: 12,
    borderColor: '#aab8c2',
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    backgroundColor: '#ffffff',
    marginRight: 10,
    fontSize: 16,
  },

  searcher__results: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  result__title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },

  result__plot: {
    fontSize: 16,
    color: '#5d6d7e',
    margin: 20,
    textAlign: 'center',
    lineHeight: 22,
  },

  result__poster: {
    width: 220,
    height: 320,
    borderRadius: 8,
    marginBottom: 20,
  },
});
