import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import globalStyles from "../globalStyles";

interface RadioListProps {
  title: string;
  dataList: string[];
  selectedItem: string;
  onItemSelect: Function;
}

function RadioList({ title, dataList, selectedItem, onItemSelect }: RadioListProps) {
  return (
    <View>
      <Text style={{ fontSize: 24, marginTop: 16, marginBottom: 8 }}>{title}</Text>
      <View style={{ backgroundColor: globalStyles.background, borderRadius: 16 }}>
        {dataList.map((item) => {
          return (
            <Pressable key={item} style={styles.radioBoxContainer} onPress={() => onItemSelect(item)}>
              <Text style={styles.radioItemText}>{item}</Text>
              <View style={styles.radioButtonOuter}>
                {selectedItem == item ? <View style={styles.radioButtonInner}></View> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default RadioList;

const styles = StyleSheet.create({
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
  radioButtonOuter: {
    borderColor: globalStyles.highlight,
    borderWidth: 2,
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    backgroundColor: globalStyles.highlight,
    height: 16,
    width: 16,
    borderRadius: 100,
  },
});
