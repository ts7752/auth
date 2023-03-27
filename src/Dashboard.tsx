import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { firebase } from "../config";
import type { FirebaseError } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

type UserData = {
  name: string;
};

const Dashboard = (): JSX.Element => {
  const [name, setName] = useState<string>("");

  //비밀번호 변경
  const changePassword = (): void => {
    const email = firebase.auth().currentUser?.email;
    if (email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert("비밀번호 변경 이메일을 전송 하였습니다 확인해 주세요.")
        }).catch((error: FirebaseError) => {
          alert(error)
        })
    }
  }
  
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data() as UserData;
          setName(data.name);
        } else {
          console.log("Not Exist");
        }
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        안녕하세요 {name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          changePassword();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>비밀번호 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 100,
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
