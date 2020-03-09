import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";

export default class DollarDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Where you can view a dollars info</Text>
        <Button
          title="Add a dollar"
          onPress={() => this.props.navigation.navigate("Upload")}
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
