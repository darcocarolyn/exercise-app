import {useState, useEffect} from "react"
import { View, Text, TouchableOpacity, } from 'react-native';


// Timer Component
function Timer({ route, navigation }) {
 const [time, setTime] = useState(0);
 const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
  if (isRunning) {
    const id = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    setIntervalId(id);
  } else {
    clearInterval(intervalId);
  }

  return () => clearInterval(intervalId);
}, [isRunning]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
 const handleStartStop = () => {
    setIsRunning(running => !running);
  };

  const handleReset = () => {
    setTime(0);
  };
    const exercise = route.params?.exercise;

  return (
     <View style={style.container}>
      <Text style={style.timeText}>
        Exercise: {exercise.name}
              </Text>
        <Text style={style.timeText}>
      {`${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`}
      </Text>
        <TouchableOpacity style = {style.buttons}onPress={handleStartStop}>
         <Text style= {style.buttonText}>
          {isRunning ? "Stop" : "Start"}
         </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttons} onPress={handleReset}>
          <Text style={style.buttonText}>Reset</Text></TouchableOpacity>
       <TouchableOpacity style={style.buttons}onPress={() => navigation.navigate('Home')}>
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
    timeText: {
      fontSize: 25
    },
    suggestText: {
      fontSize: 20
    }
  }
export default Timer