import React, { createContext, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoContext from './Context/TodoContext';
import TodoProvider from './Context/TodoProvider';

function TodoScreen({ navigation }:{navigation:any}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Todo Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddNewTodo')}>
        <Text>Add New Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

function NotesScreen({ navigation }:{navigation:any}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notes Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddNewNote')}>
        <Text>Add New Note</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddNewTodoScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add New Todo Screen</Text>
    </View>
  );
}

function AddNewNoteScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add New Note Screen</Text>
    </View>
  );
}

const TodoStack = createNativeStackNavigator();
const NotesStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TodoStackScreen() {
  return (
    <TodoStack.Navigator screenOptions={{ headerShown: false }}>
      <TodoStack.Screen name="Todo" component={TodoScreen} />
      <TodoStack.Screen name="AddNewTodo" component={AddNewTodoScreen} />
    </TodoStack.Navigator>
  );
}

function NotesStackScreen() {
  return (
    <NotesStack.Navigator screenOptions={{ headerShown: false }}>
      <NotesStack.Screen name="Notes" component={NotesScreen} />
      <NotesStack.Screen name="AddNewNote" component={AddNewNoteScreen} />
    </NotesStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <TodoProvider>
        <Tab.Navigator>
          <Tab.Screen name="TodoStack" component={TodoStackScreen} options={{ title: 'Todo' }} />
          <Tab.Screen name="NoteStack" component={NotesStackScreen} options={{ title: 'Notes' }} />
        </Tab.Navigator>
      </TodoProvider>
    </NavigationContainer>
  );
}

export default App;
