import Firebase from "./config/Firebase";
import firebase from "firebase";
require("firebase/firestore");

class Fire {
  constructor() {
    Firebase;
  }
  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy("timestamp", "desc").limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || "Secret Duck").trim(),
            ...post
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  postDollar = async ({ serialNum, videoUri, imageUri, locale }) => {
    console.log("Uploading Video...");
    const videolink = await this.uploadMedia(
      videoUri,
      `videos/${this.uid}/${Date.now()}`
    );
    console.log("Uploading Image...");
    const imagelink = await this.uploadMedia(
      imageUri,
      `photos/${this.uid}/${Date.now()}`
    );
    console.log("Adding to Dollars database...");
    return new Promise((res, rej) => {
      this.firestore
        .collection("dollars")
        .add({
          serialNum,
          uid: this.uid,
          location: locale,
          timestamp: this.timestamp,
          image: imagelink,
          video: videolink,
          viewcount: 0
        })
        .then(ref => {
          console.log("Database update Success!");
          res(ref);
        })
        .catch(error => {
          console.log("Database addition failed...");
          rej(error);
        });
    });
  };

  uploadMedia = (uri, filename) => {
    console.log("Beginning media upload...");
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

      upload.on(
        "state_changed",
        snapshot => {},
        err => {
          console.log("upload failed :(... ");
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
          console.log("Upload Success!");
        }
      );
    });
  };

  createUser = async user => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert("Error: ", error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  //Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
