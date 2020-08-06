import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { BarChart, PieChart,LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
export default function TopInfos({ dataSource }) {
  const [population, setPopulation] = useState({});
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState({});

  const sortItemByArea = () => {
    let arr = dataSource.sort(sortProperlyByArea);
    let topValues = arr.slice(0, 10);

    const pieData = [];
    topValues.forEach((element) => {
      console.log(element.area)
      pieData.push({
        name: element.name,
        population: element.area,
        legendFontSize: 8,
        legendFontColor: "#7F7F7F",
        color:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
      });
    });

    setArea(pieData);
    setLoading(false);
  };

  const sortProperlyByArea = (a, b) => {
    if (a.area > b.area) return -1;
    if (b.area > a.area) return 1;

    return 0;
  };
  const sortProperlyByPopulation = (a, b) => {
    if (a.population > b.population) return -1;
    if (b.population > a.population) return 1;

    return 0;
  };
  const sortItemByPopulation = () => {
    let arr = dataSource.sort(sortProperlyByPopulation);
    let topValues = arr.slice(0, 5);

    const data = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    topValues.forEach((element) => {
      data.labels.push(element.name);
      data.datasets[0].data.push(element.population);
    });

   
   
    setPopulation(data);
    setLoading(false);
   
  };
  useEffect(() => {
    sortItemByPopulation();
    sortItemByArea();
  }, []);

  const chartConfig = {
    decimalPlaces: 1,
    backgroundGradientFrom: "#8c8585",
    backgroundGradientTo: "#ccbcbc",
    color: (opacity = 1) => `rgba(23, 22, 22, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(23, 22, 22, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.3,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1}}>
          <ScrollView>
           <View style={{alignItems:"center"}}>

           <View>
              <Text>Top 5 Nüfus</Text>
              <BarChart
                style={{
                  marginVertical: 8,
                  borderRadius: 6,
                }}
                data={population}
                width={width / 1.1}
                height={height / 1.2}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
              />
            </View>

          <View>
            <Text>Top 10 Yüzölçümü</Text>
          <PieChart
              
              data={area}
              width={width / 1.02}
              height={height / 3}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              padding="30"
              absolute
            />
          </View>
           </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
