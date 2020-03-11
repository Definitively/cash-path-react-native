//Upload dollar form goes here
import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
  Image
} from "react-native";
import Fire from "../Fire";

//
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";

//Permissions for Camera Use
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class Upload extends React.Component {
  //Initial State
  state = {
    serial: "",
    video: "",
    image: "",
    location: ""
  };

  //Upload to Firebase
  handlePost = () => {
    this.props.navigation.navigate("Feed");
    console.log("Firebase Upload started");
    Fire.shared
      .postDollar({
        serialNum: this.state.serial.trim(),
        videoUri: this.state.video.uri,
        imageUri: this.state.image.uri,
        locale: this.state.location
      })
      .then(ref => {
        this.setState({
          serial: "",
          video: "",
          image: "",
          location: ""
        });
        alert("Your post was successful!");
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log("An error in uploading has occurred...", error);
        alert(error);
      });
  };
  //Get the video and generate a thumbnail
  getVideo = async () => {
    console.log("Wating for video selection...");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      console.log("Video Selected!");
      this.setState({ video: result });
      this.generateThumbnail();
    }
  };

  //Thumbnail generator
  generateThumbnail = async () => {
    console.log("Started Thumbnail creation..");
    try {
      let thumbnail = await VideoThumbnails.getThumbnailAsync(
        this.state.video.uri,
        {
          time: 15000
        }
      );
      console.log(thumbnail);
      console.log("Thumbnail Created!");
      this.setState({ image: thumbnail });
    } catch (e) {
      console.warn(e);
    }
  };

  //Render to screen
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text>This is the Where you add new dollars to the database</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: this.state.image.uri }}
            style={styles.previewImage}
          />
        </View>
        <Button
          title="press here to select a dollar video to be uploaded"
          onPress={() => this.getVideo()}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Serial Number"
          onChangeText={serial => this.setState({ serial })}
          value={this.state.serial}
        />
        <Button title="Press here to scan for a dollar" />
        <TextInput
          style={styles.formInput}
          placeholder="Location"
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        />
        <Button
          style={styles.button}
          title="Press here to use current location"
        />
        <Button
          style={styles.button}
          title="Press here to submit dollar form"
          onPress={() => this.handlePost()}
        />
      </KeyboardAvoidingView>
    );
  }
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: "#B5B4BC",
    borderWidth: 1,
    margin: 10,
    padding: 8
  },
  button: {
    width: 300,
    height: 80,
    borderColor: "#6FF125",
    margin: 10,
    padding: 8
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150,
    margin: 10,
    padding: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default Upload;
