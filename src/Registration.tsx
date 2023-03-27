import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");

  const registerUser = async (
    email: string,
    name: string,
    id: string,
    password: string
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser?.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://test-a7985.firebaseapp.com",
          })
          .then(() => {
            alert("이메일 인증을 위해 입력하신 이메일로 인증 메일을 전송 하였습니다 확인해 주세요.");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser?.uid)
              .set({
                email,
                name,
                id,
                password
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>회원가입</Text>
        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.textInput}
            placeholder="name"
            onChangeText={(name) => setName(name)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="id"
            onChangeText={(id) => setId(id)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="email"
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => registerUser(email, name, id, password)}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22 }}> 회원가입 </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Registration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
