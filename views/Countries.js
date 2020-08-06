import * as React from "react";

import axios from "axios";
import Flag from "react-native-flags";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  WebView,
  Dimensions,
  TextInput,
} from "react-native";


import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const Countries = React.memo(({dataSource,filterItem,query}) => {
  const navigation = useNavigation();
  console.log("render");
  const seperator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "100%",
          backgroundColor: "#e5e5e5",
          marginBottom: 10,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="grey" barStyle="light-content" />
      <TextInput
        placeholder="Enter a country name"
        placeholderTextColor="gray"
        value={query}
        onChange={filterItem}
        style={{
          height: 45,
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 5,
          paddingLeft: 10,
        }}
      />

      <FlatList
        data={dataSource}
        maxToRenderPerBatch={15}
        initialNumToRender={20}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => seperator()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Detail",{data:item})}>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View width={75} height={35}>
                
                  <Flag code={item.alpha2Code} size={32} type="shiny" />
                </View>
                <Text style={{ fontSize: 16, color: "black" }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default Countries