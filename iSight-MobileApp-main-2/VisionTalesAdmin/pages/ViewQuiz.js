import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, TextInput } from 'react-native';
import Quiz from './components/QuizQuestion';
import NavButton from './components/NavButton';

const ViewQuiz = ({ navigation, route }) => {

    const id = route.params.id;

    const [questions, setQuestions] = useState(route.params.questions);
    const [choices, setChoices] = useState(route.params.choices);
    const [correct, setCorrect] = useState(route.params.correct);

    const [qNum, setqNum] = useState(0);

    /* Not used rn, only used if FlatList is rendered */
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

    /* Not used rn, only used if FlatList is rendered */
    let listItemView = (item) => {
        return (
            <View
                key={item.choice_content}
                style={{ backgroundColor: 'white', padding: 30 }}>
                <Text>
                    {item.choice_content}
                </Text>
                <NavButton
                    customClick={async () => {
                        await getQuizQuestion(item.yt_id);
                    }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#dbb42b'}}>
            {choices && correct && questions && (
                <Quiz
                    qNum={qNum}
                    customClick={() => setqNum(qNum + 1)}
                    questions={questions}
                    choices={choices}
                    correct={correct}
                    video_id={id}
                    send={true}
                />
                
            )}
            </View>
        </SafeAreaView>
    );
};

export default ViewQuiz;
