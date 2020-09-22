import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { showLocation } from "react-native-map-link";
class ScaffoldTracker extends Component {
  state = {
    latitude: 49.0833,
    longitude: -122.35,
    showing: false,
  };
  handleSubmit = async (e) => {
    this.setState({ showing: !this.state.showing });
    this.props.onSave(this.props.id, this.location, this.whoFor, this.status);
    e.preventDefault();
  };
  handleLinkLocation = () => {
    showLocation({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      title: this.props.location,
    });
  };
  render() {
    let statusColour = styles.form;
    if (this.props.status === "All done!") {
      statusColour = styles.formComplete;
    } else if (
      this.props.status === "Going up" ||
      this.props.status === "Coming down"
    ) {
      statusColour = styles.formWorking;
    }
    return (
      <View style={styles.container}>
        <View style={statusColour}>
          <Text
            style={[
              { fontSize: 28 },
              { fontWeight: "600" },
              { position: "absolute" },
              { color: "blue" },
            ]}
          >
            {this.props.id}
          </Text>
          <View style={styles.display}>
            <TouchableWithoutFeedback
              onLongPress={
                this.props.location == "" ? null : this.handleLinkLocation
              }
            >
              <Text style={styles.titleLocation}>
                {this.props.location === ""
                  ? "Location:  Add me"
                  : this.props.location}
              </Text>
            </TouchableWithoutFeedback>
            <Text style={styles.titleOther}>
              For: {"  "}
              {this.props.whoFor === "" ? "Add me" : this.props.whoFor}
            </Text>
            <Text style={styles.titleOther}>
              Status:{"  "}
              {this.props.status === "" ? "Pick one" : this.props.status}
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              color="orange"
              onPress={() => this.setState({ showing: !this.state.showing })}
              title="Edit"
            />
          </View>
          {this.state.showing ? (
            <View>
              <View style={styles.sameLine}>
                <View style={styles.picker}>
                  <DropDownPicker
                    items={[
                      { label: "Going up", value: "Going up" },
                      { label: "Built", value: "Finished Building" },
                      { label: "Coming down", value: "Coming down" },
                      { label: "Finished", value: "All done!" },
                    ]}
                    containerStyle={{ height: 33 }}
                    onChangeItem={(item) => (this.status = item.value)}
                    placeholder="Status"
                  />
                </View>
                <View style={styles.whoFor}>
                  <TextInput
                    onChangeText={(whoFor) => (this.whoFor = whoFor)}
                    placeholder="Who it's for"
                    autoCapitalize="words"
                  />
                </View>
              </View>
              <View style={styles.location}>
                <TextInput
                  onChangeText={(location) => (this.location = location)}
                  placeholder="Location"
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.button}>
                <Button title="Submit" onPress={this.handleSubmit} />
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() =>
                    Alert.alert(
                      "Delete Job?",
                      "You sure this job is all finished?",
                      [
                        {
                          text: "Yes",
                          onPress: () => this.props.onDelete(this.props.id),
                        },
                        { text: "No", onPress: () => alert("Not deleted") },
                      ]
                    )
                  }
                  title="Delete"
                  color="red"
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  form: {
    backgroundColor: "rgb(200,250,250)",
    width: "90%",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 4,
  },
  formWorking: {
    backgroundColor: "rgb(255, 249, 166)",
    width: "90%",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 4,
  },
  formComplete: {
    backgroundColor: "rgb(227, 45, 45)",
    width: "90%",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 4,
  },
  display: {
    backgroundColor: "rgb(240, 227, 255)",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    width: "60%",
    marginHorizontal: "20%",
    marginVertical: 10,
    zIndex: 49,
    fontSize: 20,
  },
  picker: {
    width: "40%",
    margin: 10,
  },
  titleLocation: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  titleOther: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  sameLine: {
    flexDirection: "row",
    justifyContent: "center",
  },
  location: {
    marginHorizontal: "10%",
    minHeight: 30,
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 3,
  },
  whoFor: {
    justifyContent: "center",
    alignSelf: "center",
    minHeight: 30,
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 3,
    width: "40%",
    paddingHorizontal: 3,
  },
});
export default ScaffoldTracker;
