import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

function Home({ navigation }) { 
  function handleSelectExercise(exercise) {
    if (exercise.type === "reps") {
      navigation.navigate('Reps', { 
        exercise: exercise,
      });
    }
    if (exercise.type === "timer") {
      navigation.navigate('Timer', { 
        exercise: exercise,
      });
    }
  }

  return (
    <View>
<Menu selectExercise={handleSelectExercise} />
    </View>
  );
}

let exerciseList = [
  {type: "reps", name: "Push Ups", comment: ""},
  {type: "reps", name: "Jumping Jacks", comment: ""},
  {type: "reps", name: "Sit Ups", comment: ""},
  {type: "timer", name: "Running", comment: ""},
  {type: "timer", name: "Bicycling", comment: ""},
  {type: "timer", name: "Swimming", comment: ""},
];

// Menu Component
function Menu({ selectExercise }) {
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseType, setNewExerciseType] = useState('reps');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
 const [text, setText] = useState('');
  const [editable, setEditable] = useState(false);
const [commentText, setCommentText] = useState('');

 const handleEditPress = () => {
  setEditable(true);
  setText(currentExercise.comment);
};

const handleSavePress = () => {
  const updatedExercise = { ...currentExercise, comment: text };
  const exerciseIndex = exerciseList.findIndex((exercise) => exercise.name === currentExercise.name);
  exerciseList[exerciseIndex] = updatedExercise;
  setCurrentExercise(updatedExercise);
  setEditable(false);
};
  const handleCreateExercise = () => {
    if (newExerciseName) {
      const newExercise = { type: newExerciseType, name: newExerciseName, comment: "" };
      exerciseList = [...exerciseList, newExercise];
      setNewExerciseName('');
    }
  };


  const handleModalClose = () => {
    setModalVisible(false);
    setCurrentExercise(null);
  };

  const renderItem = ({ item }) =>
    (
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: '90%' }}>
<TouchableOpacity 
onPress={() => selectExercise(item)}>
    <Text>{item.name}</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    onPress={() => {
      setCurrentExercise(item);
      setModalVisible(true);
      setCommentText(item.comment);
    }}
    style={{width: "10%"}}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text>Notes</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
   <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={handleModalClose}
>
  <View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', marginTop:100, marginLeft: '15%'}}>
    {editable ? (
  <>
    <TextInput 
      style={{width: "15%"}}
      value={text}
      onChangeText={setText}
      placeholder='Edit Notes Here...'
    />
    <TouchableOpacity title="Save" onPress={handleSavePress}><Text>Save</Text></TouchableOpacity>
    <TouchableOpacity title="Return" onPress={handleModalClose}><Text>Return</Text></TouchableOpacity>
  </>
) : (
  <>
    <Text>{currentExercise ? currentExercise.comment : ''}</Text>
    <TouchableOpacity title="Edit" onPress={handleEditPress}><Text>Edit</Text></TouchableOpacity>
    <TouchableOpacity title="Return" onPress={handleModalClose}><Text>Return</Text></TouchableOpacity>
  </>
)}
    </View>
  </View>
</Modal>
  </View>
  );

  return (
   <View>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Go Do Something!</Text>
      <Text style={{fontWeight: 'medium', fontSize: 15}}>Select an Exercise:</Text>
      <FlatList
      style={{padding: 10}}
        data={exerciseList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <View style={{marginTop: 20}}>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>Create New Exercise:</Text>
      <TextInput
      style={{backgroundColor: 'white', width: '15%'}}
        placeholder="Enter Title Here..."
        value={newExerciseName}
        onChangeText={text => setNewExerciseName(text)}
      />
      <View style={{flexDirection: 'row'}}>
      <Text>Timer</Text>
      <RadioButton
        value="timer"
        status={newExerciseType === 'timer' ? 'checked' : 'unchecked'}
        onPress={() => setNewExerciseType('timer')}
      />
      <Text>Reps</Text>
      <RadioButton
        value="reps"
        status={newExerciseType === 'reps' ? 'checked' : 'unchecked'}
        onPress={() => setNewExerciseType('reps')}
      />
      </View>
      <TouchableOpacity 
      style={{borderRadius: 5, borderWidth: 2, backgroundColor: 'black', width: "10%"}}
      onPress={handleCreateExercise}>
        <Text style={{color: 'white', textAlign: 'center'}}>Add Exercise</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;