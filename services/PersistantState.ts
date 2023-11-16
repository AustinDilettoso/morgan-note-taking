import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoteDetails } from '../components/NotesList';

const setNotes = async (notesArray : NoteDetails[]) => {
    try {
        await AsyncStorage.setItem('notes', JSON.stringify(notesArray));
      } catch (error) {
        console.error("Failed to save notes", error)
      }
}

const getNotes = async () => {
  try {
    const value = await AsyncStorage.getItem('notes');
    if (value !== null) {
       return JSON.parse(value);
    }
  } catch (error) {
    console.error("Failed to load notes", error)
  }
};

export {getNotes, setNotes}
