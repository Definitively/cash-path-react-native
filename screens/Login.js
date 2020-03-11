//Need to add validation to this screen
import React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  View
} from "react-native";
import Firebase from "../config/Firebase";

class Login extends React.Component {
  //Initial State
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Root", { Screen: "Feed" });
      }
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    console.log("Attemping login...");
    try {
      Firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Login success!");
    } catch (e) {
      console.log("Login error has occured...", error);
    }
    //this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleLogin()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button
          title="Don't have an account yet? Sign up"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
        <Button title="Forgot your password?" />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  buttonSignup: {
    fontSize: 12
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 300,
    fontSize: 15,
    color: "#161F3D"
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 15,
    textTransform: "uppercase"
  }
});

export default Login;
