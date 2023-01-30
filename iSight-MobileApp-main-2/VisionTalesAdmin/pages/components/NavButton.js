import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
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
    fontSize: 20,
  },
});

export default NavButton;
