import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Flag from "react-native-flags";
import Card from "../components/Card";

const { width, height } = Dimensions.get("window");
export default function Detail({ route }) {
  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      

    <Card title="Bayrak" description={<Flag code={data.alpha2Code} size={64}/>}/>
     <Card title="Nüfus" description={data.population}/>
     <Card title="Yüzölçümü" description={`${data.area} km`}/>
     <Card title="Başkent" description={data.capital}/>
     <Card title="Para birimi" description={data.currencies[0].name}/>
     <Card title="Saat dilimi" description={data.timezones}/>
     <Card title="Telefon kodu" description={data.callingCodes}/>
    <Card title="Konuşulan diller">
        {data.languages.map(item => <Text key={item.name} style={{ color: "#282828", fontSize: 40 }}>{item.name}</Text>)}
    </Card>
    <Card title="Bulunduğu kıta" description={data.region}/>
    <Card title="Komşusu olan ülkeler">
        {data.borders.map(item => <Text key={item.name} style={{ color: "#282828", fontSize: 40 }}>{item}</Text>)}
    </Card>
    <Card title="Kendi dilinde ismi" description={data.nativeName}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: "#F2F6F9",
  },
});
