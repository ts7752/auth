import { View, Text } from "react-native";
import React from "react";

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return (
    <View style={{ marginLeft: 15 }}>
      <Text style={{ fontWeight: "bold", fontSize: 28 }}>{props.name}</Text>
    </View>
  );
};

export default Header;
