import {Dimensions, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, { useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App(): JSX.Element {
   const [taskValue, setTaskValue] = useState("");
   const [tasks,setTasks]=useState([
    {
      title:'Complete playlist till 13th vid',
      isCompleted : false,
    },
    {
      title:'Complete playlist till 13th vid',
      isCompleted : true,
    }
  ]);
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
        <TouchableOpacity style={styles.button}>
          
          <Text>Add Task</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroller} horizontal={true} >

      <View style={styles.pageContainer}>
        <Text style={styles.subHeading}>Remaining Tasks</Text>
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
    height:150,

    width:windowWidth*0.85,
    marginVertical:10,
    elevation:5,
    padding:5,
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
    width:200,
    marginVertical:10
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
