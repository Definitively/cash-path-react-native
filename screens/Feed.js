//Search

//View dollars you follow

import Firebase, { db } from "firebase";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import moment from "moment";

import List from "../components/List";
import Fire from "../Fire";

posts = [
  {
    id: "1",
    name: "Joe McKay",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage1.jpg")
  },
  {
    id: "2",
    name: "Karyn Kim",
    text:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage2.jpg")
  },
  {
    id: "3",
    name: "Emerson Parsons",
    text:
      "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage3.jpg")
  },
  {
    id: "4",
    name: "Kathie Malone",
    text:
      "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage4.jpg")
  }
];

data = [];
export default class Feed extends Component {
  state = {
    dollarList: []
  };
  componentDidMount = () => {
    this.getFoods();
  };

  async getFoods() {
    console.log("Getting Dollar data...");
    var dollarData = [];

    var snapshot = await Firebase.firestore()
      .collection("dollars")
      .orderBy("timestamp")
      .get();

    snapshot.forEach(doc => {
      const dollar = doc.data();
      dollar.id = doc.id;
      dollarData.push(dollar);
    });

    this.setState(prevState => ({
      dollarList: (prevState.dollarList = dollarData)
    }));
  }
  renderPost = dollarList => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.name}>{dollarList.serialNum}</Text>
              <Text style={styles.timestamp}>
                {moment(dollarList.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{dollarList.location}</Text>
          <Image
            source={dollarList.image}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.feed}
          data={this.state.dollarList}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});
