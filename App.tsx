// In App.js in a new project

import React,{createContext, useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoContext from './Context/TodoContext';
import TodoProvider from './Context/TodoProvider';


 

function HomeScreen({navigation}:{navigation:any}) {
  const {counter,increaseCounterByOne} = useContext(TodoContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{counter}</Text>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Second Screen');
      }}>
       <Text>
         Go to Screen Three
        </Text>
      </TouchableOpacity>
    </View>
  );
}


function ScreenTwo({navigation}:{navigation:any}) : JSX.Element {
  const {counter,increaseCounterByOne} = useContext(TodoContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen Two</Text>
      <TouchableOpacity onPress={()=>{
         navigation.navigate('Third Screen');
      }}>
       <Text>
         Go to Screen Three
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>{
         increaseCounterByOne();
      }}>
       <Text>
         Increase the value of the counter
        </Text>
      </TouchableOpacity>
    </View>
  );
}


function ScreenThree() {
  const {counter,increaseCounterByOne} = useContext(TodoContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{counter}</Text>
      <Text>Third Screen</Text>
    </View>
  );
}
//create a stack navigator 
const Stack1 = createNativeStackNavigator();
//createcontext;
//provider;
//consumer;
function App() {
  return (

    <NavigationContainer>
      <TodoProvider>
      <Stack1.Navigator initialRouteName='Home'>
        <Stack1.Screen name='Home' component={HomeScreen} options={
        {
          title:"Sai & Nidhi's App",
          
        }
        } />
        <Stack1.Screen name='Second Screen' component={ScreenTwo} />
        <Stack1.Screen name='Third Screen' component={ScreenThree} />
      </Stack1.Navigator>
      </TodoProvider>
    </NavigationContainer>
    // //wrap all with this componenet;
    // <NavigationContainer>
    //   <Stack1.Navigator>
    //     <Stack1.Screen name="Home" component={HomeScreen} />
    //   </Stack1.Navigator>
    // </NavigationContainer>
  );
}

export default App;