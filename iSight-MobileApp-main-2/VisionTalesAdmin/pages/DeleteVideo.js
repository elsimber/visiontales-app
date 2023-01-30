import { useState, useEffect } from "react";
import React from "react";
import {
  FlatList,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MainTextInput from "./components/MainTextInput";
import * as SQLite from "expo-sqlite";
import NavButton from "./components/NavButton";
import MainText from "./components/MainText";

var db = SQLite.openDatabase("VisionTalesDB.db");

const DeleteUser = ({ navigation, route }) => {
  const id_video = route.params.video_id;

  let delete_video = () => {
    console.log(id_video);
    //Delete video from database
    const delete_url = `https://2jwoowlka2.execute-api.us-east-1.amazonaws.com/videos/${route.params.yt_id}`
    fetch(delete_url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_video where video_id=?',
        [id_video],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Video deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Video Id');
          }
        }, (tx, error) => {console.log(error)}
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Text>Are you sure you wish to delete this video?</Text>
          <NavButton title="Yes" customClick={delete_video} />
          <NavButton title="No" customClick={() => navigation.navigate('HomeScreen')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
