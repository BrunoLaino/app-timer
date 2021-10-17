import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgb(80,50,168)",
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
    },
    btnChoice: {
      marginRight: 10,
      padding: 8,
      backgroundColor: "rgb(116, 67, 191)",
    },
    btnChoiceSelected: {
      marginRight: 10,
      padding: 8,
      backgroundColor: "rgba(116, 67, 191,0.3)",
      borderColor: "white",
      borderWidth: 1,
    },
    btnStart: {
      backgroundColor: "rgb(116,67,191)",
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 30,
      borderColor: "white",
      borderWidth: 2,
    },
    btnTextStart: {
      textAlign: "center",
      paddingTop: 30,
      color: "white",
      fontSize: 20,
    },
    textTimer:{
        color:'white',
        fontSize:40
    }
  });

export default styles;