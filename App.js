import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { LogBox, View } from "react-native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { Timer } from "./Timer";
import { Select } from "./SelectTimer";

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
  } else {
    if (state == "select") {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Select
            alarmSound={alarmSound}
            setState={setState}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            minutes={minutes}
            seconds={seconds}
          ></Select>
        </View>
      );
    } else if (state == "start") {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Timer
            alarms={alarmSound}
            setState={setState}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            minutes={minutes}
            seconds={seconds}
          ></Timer>
        </View>
      );
    }
  }
}
