import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  const register = ({ navigation }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: name,
            photoURL: imageURL
              ? imageURL
              : "https://www.trackergps.com/canvas/images/icons/avatar.jpg",
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });

        navigation.replace("Chat");
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        leftIcon={{ type: "material", name: "email" }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Email"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder="Enter your profile picture"
        label="Profile Picture"
        leftIcon={{ type: "material", name: "face" }}
        value={imageURL}
        onChangeText={(text) => setImageURL(text)}
      />
      <View style={styles.button}>
        <Button title="Register" onPress={register} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});

export default RegisterScreen;
