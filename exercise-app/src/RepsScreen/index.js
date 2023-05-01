import { useState } from "react";
import { View, Text, TouchableOpacity, } from 'react-native';

function Reps({ route, navigation }) {
  const [repTimes, setRepTimes] = useState(0);
  const reset = () => {
    setRepTimes(0);
  };
  const exercise = route.params?.exercise;
  return (
    <View style={style.container}>
      <Text style={style.repText}>
        Exercise: {exercise.name}
      </Text>
      <Text style={style.repText}>
        Reps: {repTimes}
      </Text>
      <TouchableOpacity
        style={style.buttons}
        onPress={() => {
          setRepTimes(repTimes + 1);
          console.log(repTimes);
        }}
      >
        <Text style={style.buttonText}>Complete Reps</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.buttons}onPress={reset}>
        <Text style={style.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.buttons} onPress={() => navigation.navigate('Home')}>
        <Text style={style.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = {
  container: {
flex: 1,
alignItems: "center",
padding: 20
  },
    buttons: {
      borderWidth: 2,
      alignItems: "center",
      backgroundColor: 'black',
    borderRadius: 3,
    margin: 5
    },
    buttonText: {
      color: "white"
    },
    repText: {
      fontSize: 25
    },
    suggestText: {
      fontSize: 20
    }
  }
export default Reps;