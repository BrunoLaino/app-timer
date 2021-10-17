import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Timer } from "./Timer";
import styles from "./Styles";

export default function App() {
  LogBox.ignoreAllLogs;

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  const [state, setState] = useState("select");
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [alarmSound, setAlarmSound] = useState([
    {
      id: 1,
      selected: true,
      sound: "alarme 1",
      file: require("./assets/alarme1.mp3"),
    },
    {
      id: 2,
      selected: false,
      sound: "alarme 2",
      file: require("./assets/alarme2.mp3"),
    },
    {
      id: 3,
      selected: false,
      sound: "alarme 3",
      file: require("./assets/alarme3.mp3"),
    },
  ]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  var numbers = [];

  for (var i = 1; i <= 60; i++) {
    numbers.push(i);
  }

  function setAlarm(id) {
    let alarmTemp = alarmSound.map(function (val) {
      if (id != val.id) val.selected = false;
      else val.selected = true;
      return val;
    });
    setAlarmSound(alarmTemp);
  }

  if (state == "select") {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(59,29,105,1)", "rgba(59,29,105,0.8)"]}
          style={styles.background}
        />

        <Text style={{ color: "white", fontSize: 30 }}>
          Selecione o seu tempo:
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white", paddingTop: 15 }}>Min:</Text>
          <Picker
            style={{ height: 50, width: 100, color: "white" }}
            selectedValue={minutes}
            onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
          >
            <Picker.Item label="0" value="0" />
            {numbers.map(function (val) {
              return (
                <Picker.Item label={val.toString()} value={val.toString()} />
              );
            })}
          </Picker>
          <Text style={{ color: "white", paddingTop: 15 }}>Seg:</Text>
          <Picker
            style={{ height: 50, width: 100, color: "white" }}
            selectedValue={seconds}
            onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
          >
            {numbers.map(function (val) {
              return (
                <Picker.Item label={val.toString()} value={val.toString()} />
              );
            })}
          </Picker>
        </View>

        <View style={{ flexDirection: "row" }}>
          {alarmSound.map(function (val) {
            if (val.selected) {
              return (
                <TouchableOpacity
                  onPress={() => setAlarm(val.id)}
                  style={styles.btnChoiceSelected}
                >
                  <Text style={{ color: "white" }}>{val.sound}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => setAlarm(val.id)}
                  style={styles.btnChoice}
                >
                  <Text style={{ color: "white" }}>{val.sound}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setState("start")}
            style={styles.btnStart}
          >
            <Text style={styles.btnTextStart}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (state == "start") {
    return (
      <Timer
        alarms={alarmSound}
        setState={setState}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        minutes={minutes}
        seconds={seconds}
      ></Timer>
    );
  }
}
