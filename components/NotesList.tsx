import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable, ListRenderItem } from "react-native";
import globalStyles from "../globalStyles";
import { getNotes, setNotes } from "../services/PersistantState";
import NoteEditorModal from "./NoteEditorModal";
import data from "../data.json";

export interface NoteDetails {
  text: string;
  category: string;
  client: string;
}

const NotesList: FC = ({}) => {
  const [editorMode, setEditorMode] = useState("new");
  const [showModal, setShowModal] = useState(false);
  const [myNotesList, setMyNotesList] = useState<NoteDetails[]>([]);
  const [noteText, setNoteText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  // Retrieves the persistant state note array
  const getPersistantNotes = async () => {
    try {
      const storedItems = await getNotes();
      if (storedItems) {
        setMyNotesList(storedItems);
      }
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };
  useEffect(() => {
    getPersistantNotes();
  }, []);

  // Saves myNoteArray to the persistant state
  const savePersistantNotes = async () => {
    try {
      await setNotes(myNotesList);
    } catch (error) {
      console.error("Error saving items:", error);
    }
  };
  useEffect(() => {
    savePersistantNotes();
  }, [myNotesList]);

  // toggels the modal open and closed
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // function to add a note to the array
  const pushNoteToArray = (newNote: NoteDetails) => {
    setMyNotesList([...myNotesList, newNote]);
  };

  // resets the values to blank for a new note and toggles the modal
  const openNewNote = () => {
    setNoteText("");
    setSelectedCategory(data.categories[0]);
    setSelectedClient(data.clients[0]);
    setEditorMode("new");
    toggleModal();
  };

  // sets the values to the selected objects and opens the modal
  const openEditNote = (noteToEdit: NoteDetails) => {
    setNoteText(noteToEdit.text);
    setSelectedCategory(noteToEdit.category);
    setSelectedClient(noteToEdit.client);
    setEditIndex(myNotesList.indexOf(noteToEdit));
    setEditorMode("edit");
    toggleModal();
  };

  // function that is called on edit save to alter the notes values
  const editNote = ({ text, category, client }: NoteDetails) => {
    const updatedObject: NoteDetails = {
      text: text,
      category: category,
      client: client,
    };
    const newArray = myNotesList.map((item, index) => (index === editIndex ? updatedObject : item));
    setMyNotesList([...newArray]);
  };

  // function that deletes the passed note from the array
  const deleteNote = (noteToDelete: NoteDetails) => {
    setMyNotesList([...myNotesList.filter((note) => note != noteToDelete)]);
  };

  // the note component that is rendered in the FlatList
  const renderItem: ListRenderItem<NoteDetails> = ({ item }) => (
    <NoteListItem item={item} deleteNoteFunc={deleteNote} editNoteFunc={openEditNote} />
  );

  return (
    <View style={styles.notesListContainer}>
      <Text
        style={{
          fontSize: 40,
          flexWrap: "wrap",
          color: globalStyles.highlight,
          marginBottom: 16,
        }}
      >
        My Notes
      </Text>
      <FlatList
        data={myNotesList}
        renderItem={renderItem}
        keyExtractor={(item: NoteDetails) => item.text + item.category + item.client}
        ListEmptyComponent={EmptyListComponent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
      />
      <Pressable style={styles.buttonContainer} onPress={openNewNote}>
        <Text style={{ fontSize: 20, color: globalStyles.background }}>Add Note +</Text>
      </Pressable>
      <NoteEditorModal
        editorMode={editorMode}
        showModal={showModal}
        setShowModal={toggleModal}
        text={noteText}
        category={selectedCategory}
        client={selectedClient}
        addNote={pushNoteToArray}
        editNote={editNote}
      />
    </View>
  );
};

const NoteListItem = ({
  item,
  deleteNoteFunc,
  editNoteFunc,
}: {
  item: NoteDetails;
  deleteNoteFunc: Function;
  editNoteFunc: Function;
}) => {
  return (
    <View style={styles.noteListItem}>
      <Text style={{ fontSize: 16 }}>{item.text}</Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Text style={{ fontSize: 20, color: globalStyles.highlight }}>{item.category}</Text>
        <Text style={{ fontSize: 20, color: globalStyles.highlight }}>{item.client}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable onPress={() => deleteNoteFunc(item)} style={styles.deleteNoteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
        <Pressable onPress={() => editNoteFunc(item)} style={styles.editNoteButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

// the empty array component
const EmptyListComponent: FC = () => {
  return (
    <Text style={{ fontSize: 20, flexWrap: "wrap", textAlign: "center" }}>
      You have no notes! Create one by pressing "Add Note +"
    </Text>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  notesListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalStyles.highlight,
    borderRadius: 16,
    padding: 16,
  },
  noteListItem: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  deleteNoteButton: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: globalStyles.highlight,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    color: globalStyles.highlight,
  },
  editNoteButton: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: globalStyles.highlight,
    backgroundColor: globalStyles.highlight,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: globalStyles.background,
  },
});
