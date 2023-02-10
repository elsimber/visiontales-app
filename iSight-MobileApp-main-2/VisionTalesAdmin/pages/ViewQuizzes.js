import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, Alert } from 'react-native';
import NavButton from './components/NavButton';

const ViewQuizzes = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let quizTitle = '';
  let questions = [];
  let choices = [];
  let correct = [];

  async function getQuizzes() {
    try {
      const response = await fetch("https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/titles");
      const json = await response.json();
      setFlatListItems(json);
      console.log("here", setFlatListItems);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async function getQuizTitle(title) {
    try {
      const response = await fetch(`https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/quizzes/${title}`);
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

  async function deleteQuizTitle(title) {
    await fetch(`https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/quizzes/${title}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
	'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((data) => {
        Alert.alert(
          'Success',
          'You Have Deleted Successfully!',
            [
      	      {
                text: 'Ok',
                onPress: () => navigation.navigate('HomeScreen'),
              },
            ],
          { cancelable: false }
    	);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Delete Failed');
      });
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
	<NavButton
          title="Edit Quiz"
          customClick={async () => {
	    await getQuizTitle(item.title);
	    console.log(quizTitle);
	    navigation.navigate('EditQuiz',{ 
	      title: quizTitle,
	      questions: questions,
	      choices: choices,
	      correct: correct
	    });
	  }}
        />
        <NavButton
          title="Delete Quiz"
          customClick={() => {
	    Alert.alert(
	      "Delete",
              `Do you want to delete: ${item.title}?`,
              [
                {
                  text: 'Ok',
                  onPress: () => {deleteQuizTitle(item.title)},
                },
              ],
              { cancelable: true }
            )
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
