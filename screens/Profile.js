import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Fire from "../Fire";

class Profile extends React.Component {
  handleSignout = () => {
    Firebase.shared.signOut();
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
