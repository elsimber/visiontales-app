import "react-native-gesture-handler";

import * as React from "react";
import { Button, View, Text, Image} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./pages/HomeScreen";
import ViewTopics from "./pages/ViewTopics";
import ViewVideos from "./pages/ViewVideos";
import AddVideo from "./pages/AddVideo";
import EditVideo from "./pages/EditVideo";
import DeleteVideo from "./pages/DeleteVideo";
import AddQuiz from "./pages/AddQuiz";
import ViewQuizzes from "./pages/ViewQuizzes";
import EditQuiz from "./pages/EditQuiz";
import EditVideoQuiz from "./pages/EditVideoQuiz";
import Donate from "./pages/Donate";
import ViewQuiz from "./pages/ViewQuiz";
import DemographicQuiz from "./pages/DemographicQuiz";

const Stack = createStackNavigator();

//the colors that control what the background of the app looks like and what the top header of the app looks like
const bkColor = "#02353c";
const headerColor = "#dbb42b";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            //title: "Vision Tales",
            headerTitle: (props) => (
              //title: "Home", //Set Header Title
              <Image
                style={{ width: 200, height: 50 }}
                source={require('./assets/eyesight_logo.png')}
                resizeMode='contain'
              />
            ),
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddVideo"
          component={AddVideo}
          options={{
            title: "Video Upload", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewTopics"
          component={ViewTopics}
          options={{
            title: "Vision Tales", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewVideos"
          component={ViewVideos}
          options={{
            title: "Vision Tales", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="EditVideo"
          component={EditVideo}
          options={{
            title: "Edit Video", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="DeleteVideo"
          component={DeleteVideo}
          options={{
            title: "Delete Video", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddQuiz"
          component={AddQuiz}
          options={{
            title: "Quiz Upload", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewQuizzes"
          component={ViewQuizzes}
          options={{
            title: "Test Your EyeQ", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="EditQuiz"
          component={EditQuiz}
          options={{
            title: "Edit Quiz", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="EditVideoQuiz"
          component={EditVideoQuiz}
          options={{
            title: "Edit Video Quiz", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="ViewQuiz"
          component={ViewQuiz}
          options={{
            title: "Take Quiz", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="DemographicQuiz"
          component={DemographicQuiz}
          options={{
            title: "Your Information", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Donate"
          component={Donate}
          options={{
            title: "Donate", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
