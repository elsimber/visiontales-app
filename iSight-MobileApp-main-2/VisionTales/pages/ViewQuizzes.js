import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, Alert } from 'react-native';
import NavButton from './components/NavButton';
import MainText from './components/MainText';

const ViewQuizzes = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let quizTitle = '';
  let questions = [];
  let choices = [];
  let correct = [];

  async function getQuizzes() {
    try {
      const response = await fetch('https://2jwoowlka2.execute-api.us-east-1.amazonaws.com/quizzes/titles');
      const json = await response.json();
      setFlatListItems(json.Items);
      console.log("made call");
    } 
    catch (error) {
      console.log(error);
    }
  }

  async function getQuizTitle(title) {
    try {
      const response = await fetch(`https://2jwoowlka2.execute-api.us-east-1.amazonaws.com/quizzes/${title}`);
      const json = await response.json();
      const quiz = json.Item;

      quizTitle = quiz.title;
      questions = quiz.questions;
      choices = quiz.choices;
      correct = quiz.correct;

      console.log("made call: ", quizTitle);
    }
    catch (error) {
      console.log(error);
    }
  }

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.title}
        style={{ backgroundColor: '#dbb42b', padding: 20 }}>
	<NavButton
          title={item.title}
          customClick={async () => {
            await getQuizTitle(item.title);
	    navigation.navigate("ViewQuiz", {
              id: item.title,
              questions: questions,
              choices: choices,
              correct: correct,
            });
	  }}
        />
      </View>
    );
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#dbb42b' }}>
	<MainText text="Test your EyeQ with some vision health quizzes!" />
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

export default ViewQuizzes;
