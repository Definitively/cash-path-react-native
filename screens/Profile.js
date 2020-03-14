import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Firebase from "../config/Firebase";

class Profile extends React.Component {
  state = {
    user: "",
    pass: "",
    email: ""
  };

  handleSignout = () => {
    try {
      Firebase.auth().signOut();
      console.log("Logout Success!");
    } catch (e) {
      console.log("A Logout error has occurred..", e);
    }
    this.props.navigation.push("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Text>User's email displayed here</Text>

        <Button title="Change Password" onPress={this.handleSignout} />

        <Button title="Change Username" onPress={this.handleSignout} />

        <Button title="Logout" onPress={this.handleSignout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 32
  }
});

export default Profile;
