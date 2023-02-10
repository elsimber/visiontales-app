import React, { useState, useEffect } from 'react';
import { FlatList, Text, ScrollView, SafeAreaView, TextInput, Pressable, StyleSheet, Alert, TouchableOpacityComponent } from 'react-native';
import Quiz from './components/QuizQuestion';
import * as SQLite from 'expo-sqlite';
import NavButton from './components/NavButton';
import MainText from './components/MainText';
import ViewVideos from './ViewVideos';
import CountryPicker from 'react-native-country-picker-modal';

var db = SQLite.openDatabase('VisionTalesDB.db');

const DemographicQuiz = ({ navigation, route }) => {

  // Variables for quiz
  let questions = ["What is your gender?", "What is your age?"];
  let choices = [
    [
      "Male",
      "Female",
      "Non Binary",
      "Prefer Not To Say"
    ],
    [
      "00 years",
      "01-04 years",
      "05-09 years",
      "10-14 years",
      "15-19 years",
      "20-24 years",
      "25-29 years",
      "30-34 years",
      "35-39 years",
      "40-44 years",
      "45-49 years",
      "50-54 years",
      "55-59 years",
      "60-64 years",
      "65-69 years",
      "70-74 years",
      "75-79 years",
      "80-84 years",
      "85+ years"
    ]
  ];
  let correct = [
    [true, true, true, true],
    [true, true, true, true]
  ];

  const [data, setData] = useState([]);
  const [uLocation, setLocation] = useState(undefined);
  const [qNum, setqNum] = useState(0);

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView style={{ height: '100%' }}>
	    <Text style={styles.header}>Help us help people!</Text>
	    <MainText text='We want to know a little about you so we can analyze how people are learning.' />
            {!uLocation && (
              <CountryPicker withEmoji
                onSelect={(country) => {
                  setLocation(country.name)
                }}
              />
            )}

            {uLocation && (
                <Text>{questions[qNum] } </Text>)
              && choices[qNum] && (
                choices[qNum].map((item, key) =>(
                  <Pressable onPress={() => {
                    let temp = data;
                    temp.push(key)
                    setData(temp)

                    // If we answered the last question
                    if (qNum >= choices.length - 1) {
			    console.log("working");
		      // Begin deleting Table
		      /*db.transaction(function (txn) {
      			txn.executeSql("DELETE FROM table_demographics WHERE EXISTS (SELECT * FROM table_demographics)", []);
      			console.log("deleted");
    		      });*/
                      // Insert response into table
                      db.transaction(function (txn) {
                        txn.executeSql(
                          'UPDATE table_demographics SET location=?, gender=?, age=? WHERE d_id=1',
                          [uLocation, choices[0][data[0]], choices[1][data[1]]],
                          (txn, results) => {
                            
                            if (results.rowsAffected > 0) {
                              Alert.alert(
                                'Thank You!',
				"😇Personal Info is updated! Please go back to the HomePage 😇",
                                [
                                  {
                                    text: 'Return Home',
                                    onPress: () => navigation.navigate('HomeScreen'),
                                  },
                                ],
                                  { cancelable: false }
                              );
                            } else {
                              alert('Local Upload Failed');
                            }
                          },
			  (txn, error) => {
			    console.log(error);
			  }
                        );
                      });
                    }
                    
                    // Increment our question counter
                    setqNum(qNum + 1)
                  }
                  } style={[styles.button]}>
                    <Text style={[styles.text]} key={key}>{item}</Text>
                  </Pressable>
                ))
              )
            }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#02353c',
    color: '#02353c',
    padding: 20,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 20,
  },
  text: {
    color: '#dbb42b',
    fontSize: 20,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbb42b',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    padding: 10,
  }
});

export default DemographicQuiz;
