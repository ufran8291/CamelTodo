import {Alert, Dimensions, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
// Add this line to your `index.js`
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App(): JSX.Element {
   const [taskValue, setTaskValue] = useState("");
   const [tasks,setTasks]=useState([
    {taskId:uuidv4(),title:'',isCompleted:false}
    // {title:"Take medicines",isCompleted:false},{title:"Complete Physics homework",isCompleted:false}
  ]);
  

  function addNewTask(){
    if (taskValue != null && taskValue.toString() != '' && taskValue!= undefined) {
      setTasks([{taskId:uuidv4() ,title:taskValue.toString(),isCompleted:false},...tasks]);
      setTaskValue('')
      Keyboard.dismiss()
    }else{
      Alert.alert('Please enter the task title','Please enter the title of the task from the above input bar.')
      return;
    }
    //[{}] array of objects
    // //  [] array of undefined
    // console.log(tasks);
    // console.log('before adding new')
    // var newTasks = tasks;
    //   newTasks.unshift({title:'some tasks',isCompleted:false}); 
      // setTasks([{title:taskValue.toString(),isCompleted:false},...tasks]);
      // console.log('after adding new')
      // console.log(tasks);
  }
  // var newTasks =  tasks
  // newTasks.unshift({title:'some tasks',isCompleted:false}); 
  // setTasks(newTasks);
  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{Keyboard.dismiss()}}>
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.heroTxt}>CamelTodo</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subHeading}>Add a new Task</Text>
        <TextInput style={styles.inputStyles} value={taskValue}  placeholder='Task Title' placeholderTextColor={'#333'} onChange={(e)=>setTaskValue(e.nativeEvent.text)} />
        <TouchableOpacity style={styles.button} onPress={addNewTask}>
          <Ionicons name="add-circle" size={35} color={'#fff'}/>
          <Text style={styles.buttonTxt}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroller} horizontal={true} >

      <View style={styles.pageContainer}>
        <Text style={styles.subHeading}>Remaining Task</Text>
        {tasks.map((task) => {
          if (task.title !='' ) {
            return (
              <View key={task.taskId} >
                <Text >{task.title}</Text>
                <Text >{task.taskId}</Text>
                <Text >{task.isCompleted.toString()}</Text>
              </View>
            )
          }
       
      })}
      </View> 
      <View style={styles.pageContainer}>
        <Text style={styles.subHeading}>Completed Tasks</Text>
      </View>
      
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#233844',
    padding: 10,
  },
  heroTxt:{
    fontSize:25,
    color:'#fff',
    fontWeight:'bold',
    marginVertical:10
  },
  inputContainer:{
    backgroundColor:'#ffffff',
    height:180,

    width:windowWidth*0.85,
    marginVertical:10,
    elevation:5,
    padding:10,
    margin:5
  },
  inputStyles:{
    borderColor:'#333',
    borderWidth:1,
  },
  button:{
    backgroundColor:'#49C144',
    paddingVertical:10,
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'center',
    width:200,
    flexDirection:'row',
    marginVertical:10
  },
  buttonTxt:{
    color:'#fff',
    fontWeight:'bold',
    marginLeft:10,
    fontSize:16
  },
  pageContainer: {
    backgroundColor:'#ffffff',
    height:windowHeight*0.65,
    width:windowWidth*0.85,
    marginVertical:10,
    elevation:5,
    padding:5,
    margin:5
  },
  subHeading:{
    color:'#BF3D35',
    marginVertical:5,
    fontWeight:'bold',
  },
  scroller:{
    flex:1,
  }
});
