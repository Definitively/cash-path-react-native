import React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../../actions/Actions";

class Forgot extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Forgot your password</Text>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
