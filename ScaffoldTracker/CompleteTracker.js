import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScaffoldTracker from "./ScaffoldTracker";
import { showLocation } from "react-native-map-link";
import DialogInput from "react-native-dialog-input";
import AsyncStorage from "@react-native-community/async-storage";
export default class CompleteTracker extends Component {
  state = {
    tracker: [{ id: 1, location: "", whoFor: "", status: "" }],
    isDialogVisible: false,
    yard: "7721 232 Street Langley City, British Columbia",
  };
  componentDidMount() {
    this.getInitialState();
  }
  getInitialState = async () => {
    const jsonValue = await AsyncStorage.getItem("tracker");
    if (jsonValue) {
      tracker = JSON.parse(jsonValue);
      this.setState({ tracker });
    }
  };
  handleSave = async (trackerID, location, whoFor, status) => {
    const tracker = [...this.state.tracker];
    if (location) {
      tracker[trackerID - 1].location = location;
    }
    if (whoFor) {
      tracker[trackerID - 1].whoFor = whoFor;
    }
    if (status) {
      tracker[trackerID - 1].status = status;
    }
    this.setState({ tracker });
    const jsonValue = JSON.stringify(this.state.tracker);
    await AsyncStorage.setItem("tracker", jsonValue);
  };
  handleDelete = async (trackerID) => {
    this.setState({
      tracker: this.state.tracker.filter((t) => t.id !== trackerID),
    });
    const jsonValue = JSON.stringify(this.state.tracker);
    await AsyncStorage.setItem("tracker", jsonValue);
  };
  handleYard = () => {
    showLocation({
      latitude: 49.0833,
      longitude: -122.35,
      title: this.state.yard,
    });
  };
  handleAddJob = async () => {
    const tracker = [...this.state.tracker];
    if (tracker.length === 0)
      tracker.push({ id: 1, location: "", whoFor: "", status: "" });
    else if (tracker[0].id !== 1)
      tracker.unshift({ id: 1, location: "", whoFor: "", status: "" });
    else
      tracker.push({
        id: tracker[tracker.length - 1].id + 1,
        location: "",
        whoFor: "",
        status: "",
      });
    this.setState({ tracker });
    const jsonValue = JSON.stringify(tracker);
    await AsyncStorage.setItem("tracker", jsonValue);
  };
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("./assets/Background.jpg")}
      >
        <View style={styles.head}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.handleAddJob}
          >
            <Text style={styles.addText}>Add Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.yardButton} onPress={this.handleYard}>
            <Text style={styles.addText}>Go to yard</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.container}>
            {this.state.tracker.map((tracker) => (
              <ScaffoldTracker
                id={tracker.id}
                onDelete={this.handleDelete}
                key={tracker.id}
                onSave={this.handleSave}
                location={tracker.location}
                whoFor={tracker.whoFor}
                status={tracker.status}
              />
            ))}
          </View>
          <View style={({ width: "60%" }, { marginHorizontal: "20%" })}>
            <Button
              title="Change Yard Location"
              onPress={() =>
                Alert.alert(
                  "Change Yard Location",
                  "Are you really sure you want to change the location of the yard?",
                  [
                    {
                      text: "Yes",
                      onPress: () =>
                        this.setState({
                          isDialogVisible: !this.state.isDialogVisible,
                        }),
                    },
                    { text: "No" },
                  ]
                )
              }
            />
            <DialogInput
              isDialogVisible={this.state.isDialogVisible}
              title={"Enter new address"}
              message={`Your current address is: ${this.state.yard}`}
              hintInput={"New address"}
              closeDialog={() =>
                this.setState({ isDialogVisible: !this.state.isDialogVisible })
              }
              submitInput={(yard) =>
                this.setState({
                  yard,
                  isDialogVisible: !this.state.isDialogVisible,
                })
              }
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    marginTop: 20,
  },
  head: {
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
  },
  addButton: {
    width: "17%",
    marginHorizontal: "2%",
    height: 40,
    marginTop: 55,
    borderRadius: 6,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 17,
    color: "white",
  },
  yardButton: {
    marginHorizontal: "2%",
    height: 40,
    marginTop: 55,
    borderRadius: 6,
    backgroundColor: "green",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
  },
});
