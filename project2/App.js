import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/HomeScreen/index.js'
import Timer from './src/TimerScreen/index.js';
import Reps from './src/RepsScreen/index.js'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Reps" component={Reps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




