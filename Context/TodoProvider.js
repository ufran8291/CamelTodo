import React,{createContext, useState} from 'react';
import TodoContext from './TodoContext';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoProvider =({children}) =>{
    const [counter,setCounter] = useState(0);
    
    const increaseCounterByOne = () =>{
        setCounter(counter+1);
    }
    const addAnObjectToLocal= async() =>{
        const randomPerson ={
            name:'Sai',
            age:14,
            gender:"male",
            isVoter : false,
        }
        try {
            const jsonValue = JSON.stringify(randomPerson);
            await AsyncStorage.setItem('userOne', jsonValue)
          } catch(e) {
            console.log(e);
            
            // Alert.alert(e);
          }
          console.log('done');

        //   Alert.alert('Done.');
    }

    const fetchItemFromLocal=async()=>{
        try {
            const jsonValue = await AsyncStorage.getItem('userOne')
            const newJson =  jsonValue != null ? JSON.parse(jsonValue) : null
            console.log(newJson);
          } catch(e) {
            console.log(e)
          }
        
          console.log('Done.')
    }
    return(
        <TodoContext.Provider value={{counter,increaseCounterByOne,addAnObjectToLocal,fetchItemFromLocal}} >
            {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider;
