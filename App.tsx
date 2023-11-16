import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NotesList from './components/NotesList';
import globalStyles from './globalStyles';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NotesList/>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.background,

  },
});
