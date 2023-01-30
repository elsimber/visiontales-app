import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar, Pressable, StyleSheet, } from 'react-native';
import uuid from 'react-native-uuid';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('VisionTalesDB.db');

const Quiz = (props) => {

  const [selectedId, setSelectedId] = useState(null);
  const [demoData, setDemoData] = useState([]);

  // Query for demographic data
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_demographics",
        [],
        (tx, results) => {
          console.log("Results: ", results.rows);
          var temp = [];
          temp.push(results.rows.item(0));
          setDemoData(temp);
        },
      );
    });
  }, []);


  return (
    <SafeAreaView>
      <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 20 }}>{props.questions[props.qNum]}</Text>
      {props.choices[props.qNum] &&
        props.choices[props.qNum].map((item, key) => (
          <Pressable onPress={() => {
            // Increment our question counter
            props.customClick()

            // Send the response to AWS
	    // Removed for admin version to not tamper with results data
	    /*
            fetch('https://2jwoowlka2.execute-api.us-east-1.amazonaws.com/responses', {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                response_id: uuid.v4(),
                quiz_id: props.video_id,
                question_text: props.questions[props.qNum],
                Location: demoData[0].location,
                choices_chosen: key,
                gender: demoData[0].gender,
                age: demoData[0].age
              })
            })
              .then(response => response.json())
              .then((data) => {
                // Alert.alert(
                //   'Success',
                //   'You Have Uploaded Successfully!',
                //     [
                //       {
                //         text: 'Ok',
                //         onPress: () => navigation.navigate('HomeScreen'),
                //       },
                //     ],
                //     { cancelable: false }
                // );
              })
              .catch((error) => {
                console.log(error);
                Alert.alert('Response Failed To Upload');
              });	*/

            if (props.correct[props.qNum][key]) {
              alert("🤗😊🎈 Correct! 😀🥳😇")
            } else {
              alert("👎😲💩 Incorrect! 🤨😑😭")
            }
          }
         } style={[styles.button]}>
            <Text key={key} style={{ color: "#dbb42b", fontSize: 20 }} >{item}</Text>
          </Pressable>
        ))
      }
      {(props.qNum >= props.questions.length) &&
        <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontSize: 20 }}> Quiz done! 🥳✅ Please return to previous page 🔙 </Text>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0e363c',
    color: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#dbb42b',
    fontSize: 20
  },
  baseText: {
    fontWeight: 'bold'
  },
  container: {
    color: 'white'
  }
});

export default Quiz;
