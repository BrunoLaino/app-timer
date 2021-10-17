import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import styles from "./Styles";

export function Timer(props) {
  var done = false;
  var seconds = formatTimerNumber(props.seconds);
  var minutes = formatTimerNumber(props.minutes);

  useEffect(() => {
    const timer = setInterval(() => {
      props.setSeconds(props.seconds - 1);

      if (props.seconds <= 0) {
        if (props.minutes > 0) {
          props.setMinutes(props.minutes - 1);
          props.setSeconds(59);
        } else {
          if (!done) {
            done = true;
            reset();
            alert("Alarme!");
            playAlarmSound();
          }
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  function formatTimerNumber(number) {
    return ("00" + number).slice(-2);
  }

  function reset() {
    props.setState("select");
    props.setMinutes(0);
    props.setSeconds(1);
  }

  async function playAlarmSound() {
    const sound = new Audio.Sound();
    try {
      var alarm;
      props.alarms.map(function (val) {
        if (val.selected) {
          alarm = val.file;
        }
      });
      await sound.loadAsync(alarm);
      await sound.playAsync();
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(59,29,105,1)", "rgba(59,29,105,0.8)"]}
        style={styles.background}
      />

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textTimer}>{minutes} : </Text>
        <Text style={styles.textTimer}>{seconds}</Text>
      </View>

      <TouchableOpacity onPress={() => reset()} style={styles.btnStart}>
        <Text style={styles.btnTextStart}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
