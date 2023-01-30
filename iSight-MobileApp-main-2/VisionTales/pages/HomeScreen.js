import React, { useEffect, useState } from "react";
import { ScrollView, Text, SafeAreaView, Alert, Linking, StyleSheet } from "react-native";
import NavButton from "./components/NavButton";
import MainText from "./components/MainText";
import * as SQLite from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native";

var db = SQLite.openDatabase("VisionTalesDB.db");

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  // demoInfoFilled is to check if demographic info is filled up
  const [demoInfoFilled, setDemoInfoFilled] = useState(0);

  // Map of video title to Id's
  const videoIdMap = new Map();

  // Demographic Info
  const [demoInfo, setDemoInfo] = useState([]);

  // Object to contain JSON response from db server
  let videoData = {};

  // Pull video data from AWS
  async function getVideos() {
    try {
      const response = await fetch(
        "https://2jwoowlka2.execute-api.us-east-1.amazonaws.com/videos"
      );
      const json = await response.json();
      videoData = json;
      console.log("made call");
      await loadDatabase();
      console.log("database loaded");
    } catch (error) {
      console.log(error);
    }
  }

  async function loadDatabase() {
    console.log("loading db");
    db.transaction(function (txn) {
      // Begin creating Video Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_video'",
        [],
        function (tx, res) {
          console.log("video item:", res.rows.length);
          if (res.rows.length >= 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_video", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_video(video_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), topic VARCHAR(20), url VARCHAR(255), yt_id VARCHAR(20))",
              []
            );
          }
        },
	function (tx, error) {
	  console.log(error);
	}
      );
    });

    // Insert videos pulled from server into local database
    for (let i = 0; i < videoData.Items.length; i++) {
      db.transaction(function (txn) {
        // Insert into video table video data:
        txn.executeSql(
          "INSERT INTO table_video (title, topic, url, yt_id) VALUES (?,?,?,?)",
          [
            videoData.Items[i].title,
            videoData.Items[i].topic,
            videoData.Items[i].yt_url,
            videoData.Items[i].video_id,
          ],
          (txn, results) => {
            if (results.rowsAffected > 0) {
              console.log(results.insertId + " Video uploaded!");
              videoIdMap.set(videoData.Items[i].title, results.insertId);
            } else {
              alert("Upload Failed");
            }
          }
        );
      });
    }

    // Create demographic storage
    db.transaction(function (txn) {
      // Begin creating Video Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_demographics'",
        [],
        function (tx, res) {
          console.log("demographic item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_demographics(d_id INTEGER PRIMARY KEY, location VARCHAR(50), gender VARCHAR(20), age VARCHAR(255))",
              [],
              (txn, res) => {
                console.log(res.rows);
              },
              (txn, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });

    //Fill demographic data
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT d_id FROM table_demographics WHERE d_id=1",
        [],
        function (tx, res) {
          console.log("demographic item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "INSERT INTO table_demographics (d_id, location, gender, age) VALUES(1,'NA','NA','NA')",
              [],
              (txn, res) => {
                console.log(res.rows);
              },
              (txn, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Begin creating Quiz Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_quiz'",
        [],
        function (txn, res) {
          console.log("quiz item:", res.rows.length);
          if (res.rows.length >= 0) {
            console.log("going into quiz table drop");
            txn.executeSql(
              "DROP TABLE IF EXISTS table_quiz",
              [],
              (txn, res) => {
                console.log("quiz table dropped");
              },
              (txn, error) => {
                console.log(error);
                console.log("quiz table drop error");
              }
            );
            // txn.executeSql("PRAGMA foreign_keys = ON");
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_quiz(quiz_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), video_id INTEGER NOT NULL, FOREIGN KEY (video_id) REFERENCES table_video (video_id))",
              [],
              (txn, response) => {
                console.log("created table quiz!!");
              },
              (txn, error) => {
                console.log(error);
                console.log("error in creating quiz table!!");
              }
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Begin creating for Question Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_question'",
        [],
        function (txn, res) {
          console.log("question item:", res.rows.length);
          if (res.rows.length >= 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_question", []);
            // , ,
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_question(question_id INTEGER PRIMARY KEY AUTOINCREMENT, content VARCHAR(255), quiz_id INTEGER NOT NULL, FOREIGN KEY (quiz_id) REFERENCES table_quiz(quiz_id) )",
              []
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Begin creating for Question Choice Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_question_choice'",
        [],
        function (tx, res) {
          console.log("question choice item:", res.rows.length);
          if (res.rows.length >= 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_question_choice", []);
            // isAnswer: 0 means false/ 1 means true
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_question_choice(choice_id INTEGER PRIMARY KEY AUTOINCREMENT, choice_content VARCHAR(255), isAnswer INTEGER, question_id INTEGER NOT NULL, FOREIGN KEY (question_id) REFERENCES table_question(question_id) )",
              []
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Insert quizzes, choices, and answers into local DB from server DB
      // Insert quizzes from server into local DB
      if (videoData.Items) {
        for (let i = 0; i < videoData.Items.length; i++) {
          // If the quiz object isn't empty:
          if (videoData.Items[i].quiz) {
            txn.executeSql(
              "INSERT INTO table_quiz (title, video_id) VALUES (?,?)",
              [
                videoData.Items[i].title + ` Quiz`,
                videoIdMap.get(videoData.Items[i].title),
              ],
              (txn, resultsQuiz) => {
                if (resultsQuiz.rowsAffected > 0) {
                  console.log(resultsQuiz.insertId + " Quiz downloaded!");

                  // If the questions object in quiz isn't empty
                  if (videoData.Items[i].quiz.questions) {
                    for (
                      let j = 0;
                      j < videoData.Items[i].quiz.questions.length;
                      j++
                    ) {
                      txn.executeSql(
                        "INSERT INTO table_question (content, quiz_id) VALUES (?, ?)",
                        [
                          videoData.Items[i].quiz.questions[j],
                          resultsQuiz.insertId,
                        ],
                        (txn, resultsQuestion) => {
                          // Now, upload choices for question, if question download is successful
                          if (resultsQuestion.rowsAffected > 0) {
                            for (
                              let k = 0;
                              k < videoData.Items[i].quiz.choices.length;
                              k++
                            ) {
                              txn.executeSql(
                                "INSERT INTO table_question_choice (choice_content, isAnswer, question_id) VALUES (?, ?, ?)",
                                [
                                  videoData.Items[i].quiz.choices[j][k],
                                  videoData.Items[i].quiz.correct[j][k],
                                  resultsQuestion.insertId,
                                ],
                                (txn, resultsChoice) => {
                                  if (resultsChoice.rowsAffected > 0) {
                                    console.log(
                                      videoData.Items[i].quiz.choices[j][k] +
                                        " downloaded successfully!"
                                    );
                                  } else {
                                    alert("Choice Download Failed");
                                  }
                                }
                              );
                            }
                          } else {
                            alert("Question Download Failed");
                          }
                        }
                      );
                    }
                  }
                } else {
                  alert("Upload Failed");
                }
              }
            );
          }
        }
      }
    });
  }

  async function startup() {
    // const [demoInfoFilled, setDemoInfoFilled] = useState();
    console.log("---------- BEGIN --------------");
    await getVideos();
    console.log("demographic data");

    // Test for quiz input
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * from table_demographics",
        [],
        (txn, result) => {
          console.log(result.rows);
          console.log("demographic row count: ");
          console.log(result.rows.length);
          if (result.rows.length > 0) {
            // if demographic info is filled up, the user would only able to change their profile
            setDemoInfoFilled(1);
          } else {
            setDemoInfoFilled(0);
          }
        },
        (txn, error) => {
          console.log(error);
          console.log("quiz error!!");
        }
      );
    });
  }

  // Code to run on startup
  useEffect(() => {
    // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
    startup();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#dbb42b" }}>
	<Text style={styles.header}>Vision Tales</Text>
	<MainText text="The Vision Tales Project uses entertainment education to meet the visual health literacy needs of the public. Stories are developed to highlight the real-life implications of various eye diseases. We hope that you Be Enlightened, Be Entertained, and Be Eye Healthy." />
        <NavButton
          title="Vision Tales"
          customClick={() => navigation.navigate("ViewTopics")}
        />
        <NavButton
          title="Test Your EyeQ"
          customClick={() => navigation.navigate("ViewQuizzes")}
        />
        <NavButton
          title="Blog"
          customClick={() =>
            Linking.openURL("https://www.cherisheyesight.org/news")
          }
        />
        <NavButton
          title="Additional Resources"
          customClick={() =>
            Linking.openURL("https://www.cherisheyesight.org/resources")
          }
        />
        <NavButton
          title="Donate"
          customClick={() => navigation.navigate("Donate")}
        />
        <NavButton
          title="Change Your Profile"
          customClick={() => navigation.navigate("DemographicQuiz")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    padding: 10,
  }
});

export default HomeScreen;
