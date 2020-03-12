import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class Signup extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the feed screen</Text>
        <Button
          title="Submit Email and Password"
          onPress={() => this.props.navigation.replace("Login")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
