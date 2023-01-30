import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert, Linking, Image, TouchableOpacity, StyleSheet, } from "react-native";
import NavButton from "./components/NavButton";
import MainText from "./components/MainText";

const Donate = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#dbb42b" }}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainer} >
          <View style={{ width: "100%", flex: 1, alignItems: "center"}} >
            <MainText text="Many Ways to Support Us" />
            <MainText text="Make a tax deductable donation of $250 or more!" />
            <TouchableOpacity onPress={() => Linking.openURL("https://www.givelify.com/donate/cherish-eyesight-and-vision-bellevue-oh-2j7wy5MTUwMDQ4/donation/amount")} >
              <Image source={require("./images/givelify.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "#dbb42b", width: "100%", flex: 1, alignItems: "center" }}>
            <MainText text="Donate less than $250!" />
            <Image source={require("./images/venmoqr.webp")} />
            <Image source={require("./images/cashappqr.webp")} />
          </View>
          <View>
            <MainText text="Donate while you shop!" />
            <MainText text="When you shop at smile.amazon.com, Amazon donates." />
            <NavButton
              title="Go to smile.amazon.com"
              customClick={() => Linking.openURL("https://smile.amazon.com/ch/85-4346044")}
            />
          </View>
          <View style={{ backgroundColor: "#dbb42b", width: "100%", flex: 1, alignItems: "center" }}>
            <MainText text="Have a talent you want to share?" />
            <MainText text=" 🎨 Drawing" />
            <MainText text=" 👾 Animation" />
            <MainText text=" ✍️ Script Writing" />
            <MainText text=" 💻 Social Media Marketing" />
            <MainText text=" ✒️ Graphic Design" />
            <MainText text=" 📽️ Content Creator" />
            <MainText text="Volunteer!" />
            <NavButton
              title="Partner with Us"
              customClick={() => Linking.openURL("https://www.cherisheyesight.org/volunteer-form")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  }
});

export default Donate;
