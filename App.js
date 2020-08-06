import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Countries from "./views/Countries";
import TopInfos from "./views/TopInfos";
import Detail from "./views/Detail";
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

function SearchStack({ dataSource, filterItem, query }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Countries"
        children={() => (
          <Countries
            dataSource={dataSource}
            filterItem={filterItem}
            query={query}
          />
        )}
        options={() => {
          return {
            headerMode: "none",
            header: () => {},
          };
        }}
      />
      <HomeStack.Screen
        name="Detail"
        component={Detail}
        options={({ route, navigation }) => {
          return {
            title: (route.params && route.params.data.name) || "",
            headerStyle: {
             
              shadowColor: "transparent",
            },
          };
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.eu/rest/v2/all"
        );

        console.log(Array.isArray(response.data));

        setDataSource(response.data);
        setDataBackup(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const filterItem = useCallback(
    (event) => {
      let query = event.nativeEvent.text;
      console.log(query);
      setQuery(query);
      if (query == "") {
        setDataSource(dataBackup);
      } else {
        let data = dataBackup;
        query = query.toLowerCase();
        data = data.filter((country) => {
          return country.name.toLowerCase().startsWith(query);
        });

        setDataSource(data);
      }
    },
    [query]
  );
  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <NavigationContainer>
          <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
            <Tab.Screen
              name="Countries"
              children={() => (
                <SearchStack
                  dataSource={dataSource}
                  filterItem={filterItem}
                  query={query}
                />
              )}
              options={{
                tabBarIcon: ({ color }) => (
                  <EvilIcons name="search" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="TopInfos"
              children={() => (
                <TopInfos dataSource={dataSource}/>
              )}
              options={{
                tabBarIcon: ({ color }) => (
                  <Feather name="info" size={24} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
