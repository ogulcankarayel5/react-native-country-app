import React from "react";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default function Card({ title, description, children }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <View
        style={{
          borderRadius: 25,
          backgroundColor: "#FFFFFF",
          width: width / 1.2,
          padding:20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#aba4a4", fontSize: 32, fontWeight: "bold" }}>
          {title}
        </Text>
        {description ? ( <Text style={{ color: "#282828", fontSize: 40 }}>{description}</Text>):children}
       
        
       
      </View>
    </View>
  );
}
