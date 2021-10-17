import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./Styles";

export function Select(props){

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

    return (
        <View style={styles.container}>
          
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
              selectedValue={props.minutes}
              onValueChange={(itemValue, itemIndex) => props.setMinutes(itemValue)}
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
              selectedValue={props.seconds}
              onValueChange={(itemValue, itemIndex) => props.setSeconds(itemValue)}
            >
              {numbers.map(function (val) {
                return (
                  <Picker.Item label={val.toString()} value={val.toString()} />
                );
              })}
            </Picker>
          </View>
  
          <View style={{ flexDirection: "row" }}>
            {props.alarmSound.map(function (val) {
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
              onPress={() => props.setState("start")}
              style={styles.btnStart}
            >
              <Text style={styles.btnTextStart}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}