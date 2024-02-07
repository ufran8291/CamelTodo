import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App(): JSX.Element {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.heroTxt}>CamelTodo</Text>
      <ScrollView style={styles.scroller} horizontal={true} >

      <View style={styles.pageContainer}>
        <Text style={styles.subHeading}>Remaining Tasks</Text>
      </View> 
      <View style={styles.pageContainer}>
        <Text style={styles.subHeading}>Completed Tasks</Text>
      </View>
      
      </ScrollView>
    </SafeAreaView>
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
