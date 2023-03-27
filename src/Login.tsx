import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { createStackNavigator } from "@react-navigation/stack";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Stack = createStackNavigator();

const Login = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const loginUser = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(inputEmail, inputPassword);
    } catch (error) {
      alert("이메일 또는 비밀번호를 확인해 주세요");
    }
  };
  //비밀번호 분실 시 비밀번호 재설정 링크
  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(inputEmail)
      .then(() => {
        alert("패스워드 변경을 위해 이메일은 전송 하였습니다 확인해 주세요.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 26 }}>로그인</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => setInputEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(text) => setInputPassword(text)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={() => loginUser()} style={styles.button}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          {" "}
          로그인{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}> 회원가입 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          forgetPassword();
        }}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {" "}
          비밀번호를 잊어 버리셨나요?{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
    marginTop: 20,
    height: 70,
    width: 250,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
