import React, { useState, useEffect } from "react";
import { FlatList, Text, View, SafeAreaView } from "react-native";
import NavButton from "./components/NavButton";
import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("VisionTalesDB.db");

const ViewTopics = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT DISTINCT topic FROM table_video",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: "100%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View key={item.topic} style={{ backgroundColor: "#dbb42b", padding: 20 }}>
        <NavButton
          title={item.topic}
          customClick={() =>
            navigation.navigate("ViewVideos", {
              topic: item.topic,
            })
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#dbb42b" }}>
        <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewTopics;
