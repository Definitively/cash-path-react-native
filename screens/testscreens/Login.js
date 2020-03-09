import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Login screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Feed")}
        />
        <Button
          title="Go to Sign Up Screen"
          onPress={() => this.props.navigation.navigate("Signup")}
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
