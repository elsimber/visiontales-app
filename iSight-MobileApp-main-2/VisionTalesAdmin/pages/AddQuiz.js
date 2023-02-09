import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import NavButton from './components/NavButton';
import MainTextInput from './components/MainTextInput';

const AddQuiz = ({ navigation }) => {
  let [quizTitle, setQuizTitle] = useState('');
  let [textValue, setTextValue] = useState('');
  let [numInputs, setNumInputs] = useState(1);
  let [isCorrect, setIsCorrect] = useState(false);
  let refInputs = useRef([textValue]);
  let refAnswers = useRef([[textValue, textValue]]);
  let refCorrect = useRef([[false, false]]);
  let questions = [];

  let setInputValue = (index: number, value: string) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  }

  let addInput = () => {
    refInputs.current.push('');
    refAnswers.current.push(['', '']);
    refCorrect.current.push([false, false]);
    setNumInputs(refInputs.current.length);
  }

  let removeInput = () => {
    refInputs.current.splice(refInputs.current.length - 1, 1)[0];
    refAnswers.current.splice(refAnswers.current.length - 1, 1)[0];
    refCorrect.current.splice(refCorrect.current.length - 1, 1)[0];
    setNumInputs(refInputs.current.length);
  }

  let populateQuestions = () => {
    for (let i = 0; i < refInputs.current.length; i++) {
      let answers = [];
      for (let j = 0; j < refAnswers.current[i].length; j++) {
        answers.push(
          <View key={j}>
            <Text>Answer {j + 1}.</Text>
            <MainTextInput
              placeholder="Enter Answer"
              onChangeText={
                value => {
                  refAnswers.current[i][j] = value;
                  setTextValue(value);
                }
              }
              value={refAnswers.current[i][j]}
              style={{ padding: 10 }}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <CheckBox
              value={refCorrect.current[i][j]}
              onValueChange={
                value => {
                  refCorrect.current[i][j] = value;
                  setIsCorrect(!isCorrect);
                }
              }
              style={{ margin: 10}}
            />
            <Text style={{ marginTop: 10 }}>Correct Answer</Text>
            </View>
          </View>
        )
      }

      questions.push(
        <View key={i}
          style={{
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingTop: 15,
            marginTop: 15,
          }}>
          <Text>Question {i + 1}.</Text>
          <MainTextInput
            placeholder="Enter Question"
            onChangeText={
              value => setInputValue(i, value)
            }
            value={refInputs.current[i]}
            style={{ padding: 10 }}
          />
          {answers}
          {refAnswers.current[i].length < 4 ?
            <NavButton
              title="Add an Answer"
              customClick={
                () => {
                  refAnswers.current[i].push('');
                  refCorrect.current[i].push(false);
                  setNumInputs(refAnswers.current[i].length);
                }
              } />
            : null
          }
          {refAnswers.current[i].length > 2 ?
            <NavButton
              title="Remove Answer"
              customClick={
                () => {
                  refAnswers.current[i].splice(refAnswers.current[i].length - 1, 1)[0];
                  refCorrect.current[i].splice(refCorrect.current[i].length - 1, 1)[0];
                  setNumInputs(refAnswers.current[i].length);
                }} />
            : null
          }
        </View>
      );
    }
  }

  let add_quiz = () => {
    if (!quizTitle) {
      alert('Please fill video title');
      return;
    }

    for (let i = 0; i < refInputs.current.length; i++) {
      if (!refInputs.current[i]) {
        alert(`Please fill Question ${i + 1}`);
        return;
      }

      for (let j = 0; j < refAnswers.current[i].length; j++) {
        if (!refAnswers.current[i][j]) {
          alert(`Please fill Answer ${j + 1} of Question ${i + 1}`);
          return;
        }
        if (!refCorrect.current[i].includes(true)) {
          alert(`At least 1 answer of Question ${i + 1} should be correct`);
          return;
        }
      }
    }

    fetch("https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/quizzes", {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: quizTitle,
        questions: refInputs.current,
        choices: refAnswers.current,
        correct: refCorrect.current,
      })
    })
      .then(response => response.json())
      .then((data) => {
        Alert.alert(
          'Success',
          'You Have Uploaded Successfully!',
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
        Alert.alert('Upload Failed');
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <MainTextInput
                  placeholder="Enter Title"
                  onChangeText={
                    (quizTitle) => setQuizTitle(quizTitle)
                  }
                  style={{ padding: 10 }}
                />
              </View>
              {/* <MainTextInput
                placeholder="Enter Title"
                onChangeText={
                  (quizTitle) => setQuizTitle(quizTitle)
                }
                style={{ padding: 10, backgroundColor: 'red'}}
              /> */}

              {populateQuestions()}
              {questions.map(question => question)}
              {refInputs.current.length < 5 ?
                <NavButton
                  title="Add a Question"
                  customClick={addInput} />
                : null
              }
              {refInputs.current.length > 1 ?
                <NavButton
                  title="Remove Question"
                  customClick={removeInput} />
                : null
              }

              <NavButton title="Submit" customClick={add_quiz} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddQuiz;
