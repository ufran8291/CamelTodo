import { Alert, Dimensions, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function App(): JSX.Element {
   const [taskValue, setTaskValue] = useState("");
   const [tasks,setTasks]=useState([
    {taskId:uuidv4(),title:'',isCompleted:false}
  ]);

  function addNewTask(){
    if (taskValue != null && taskValue.toString() != '' && taskValue!= undefined) {
      setTasks([{taskId:uuidv4() ,title:taskValue.toString(),isCompleted:false},...tasks]);
      setTaskValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Please enter the task title','Please enter the title of the task from the above input bar.')
      return;
    }
  }

  function checkIfTasKCompleted(taskId: string) {
    const updatedTasks = tasks.map(task => {
      if (task.taskId === taskId) {
        if (task.isCompleted === false) {
          return { ...task, isCompleted: true };
        } else {
          return { ...task, isCompleted: false };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  

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
        <Text style={styles.subHeading}>Remaining Tasks</Text>
        {tasks.map((task) => {
          if (task.isCompleted === false && task.title !== '') {
            return (
              <View key={task.taskId} style={styles.taskContainer}>
                  <View style={styles.taskItem}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={styles.iconsContainer}>
                      <TouchableOpacity onPress={() => checkIfTasKCompleted(task.taskId)}>
                        <EntypoIcon name="check" size={30} color="green" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <EntypoIcon name="cross" size={30} color="red"/>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
            )
          }
       
        })}
      </View> 
      <View style={styles.pageContainer}>
        <Text style={styles.subHeading}>Completed Tasks</Text>
        {tasks.map((task) => {
          if (task.isCompleted === true && task.title !== '') {
            return (
              <View key={task.taskId} style={styles.taskContainer}>
                  <View style={styles.taskItem}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={styles.iconsContainer}>
                      <TouchableOpacity onPress={() => checkIfTasKCompleted(task.taskId)}>
                        <EntypoIcon name="check" size={30} color="green" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <EntypoIcon name="cross" size={30} color="red"/>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
            )
          }
       
        })}
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
    backgroundColor: '#ffffff',
    height: windowHeight * 0.65,
    width: windowWidth * 0.85,
    marginVertical: 10,
    elevation: 5,
    padding: 5,
    margin: 5,
  },

  subHeading:{
    color:'#BF3D35',
    marginVertical:5,
    fontWeight:'bold',
  },

  scroller:{
    flex:1,
  },

  taskContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    
  },
  
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
