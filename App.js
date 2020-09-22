import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CompleteTracker from "./ScaffoldTracker/CompleteTracker";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CompleteTracker />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
