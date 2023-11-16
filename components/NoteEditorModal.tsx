import React, { useEffect, useState } from "react";
import { Modal, View, ScrollView, Text, TextInput, Pressable, Dimensions, StyleSheet } from "react-native";

import data from "../data.json";
import globalStyles from "../globalStyles";
import { NoteDetails } from "./NotesList";
import RadioList from "./RadioList";

interface NoteInterface {
  editorMode: string;
  showModal: boolean;
  setShowModal: Function;
  text: string;
  category: string;
  client: string;
  addNote: Function;
  editNote: Function;
}

const PHONE_HEIGHT = Dimensions.get("window").height;

function NoteEditorModal({
  editorMode,
  showModal,
  setShowModal,
  text,
  category,
  client,
  addNote,
  editNote,
}: NoteInterface) {
  useEffect(() => {
    setNoteText(text);
    setSelectedCategory(category);
    setSelectedClient(client);
  }, [showModal]);

  const [noteText, setNoteText] = useState(text);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedClient, setSelectedClient] = useState(client);

  const onTextChange = (text: string) => {
    setNoteText(text);
  };
  const onCategoryPress = (cat: string) => {
    setSelectedCategory(cat);
  };
  const onClientPress = (client: string) => {
    setSelectedClient(client);
  };
  const onSavePress = () => {
    const newNote: NoteDetails = {
      text: noteText,
      category: selectedCategory,
      client: selectedClient,
    };
    if (editorMode == "new") {
      addNote(newNote);
    } else if (editorMode == "edit") {
      editNote(newNote);
    }

    resetValues();
    setShowModal();
  };
  const onCancelPress = () => {
    resetValues();
    setShowModal();
  };

  const resetValues = () => {
    setNoteText("");
    setSelectedCategory("");
    setSelectedClient("");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>Note</Text>
          <TextInput
            value={noteText}
            onChangeText={onTextChange}
            style={styles.inputArea}
            multiline
            numberOfLines={4}
            placeholder={"Enter Your Note Here"}
          ></TextInput>
          <RadioList
            dataList={data.categories}
            title={"Categories"}
            selectedItem={selectedCategory}
            onItemSelect={onCategoryPress}
          />
          <RadioList
            dataList={data.clients}
            title={"Clients"}
            selectedItem={selectedClient}
            onItemSelect={onClientPress}
          />
        </ScrollView>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <Pressable style={styles.buttonContainerLowFocus} onPress={() => onCancelPress()}>
            <Text style={{ fontSize: 20, color: globalStyles.highlight }}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.buttonContainer} onPress={() => onSavePress()}>
            <Text style={{ fontSize: 20, color: globalStyles.background }}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default NoteEditorModal;

const styles = StyleSheet.create({
  notesListContainer: {
    flex: 1,
  },
  modalContainer: {
    paddingHorizontal: 20,
    height: PHONE_HEIGHT * 0.8,
    top: PHONE_HEIGHT * 0.2,
    backgroundColor: globalStyles.background,
    gap: 16,
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 2,
    borderColor: globalStyles.highlight,
  },
  inputArea: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderColor: globalStyles.highlight,
    borderWidth: 2,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalStyles.highlight,
    borderRadius: 16,
    padding: 16,
  },
  buttonContainerLowFocus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalStyles.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: globalStyles.highlight,
  },
  radioBoxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  radioItemText: {
    fontSize: 18,
  },
});
