import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesScreen from './Context/NotesScreen.js';
import Intro from './Context/NotesProvider.js';
import NotesDetail from './components/NotesDetail.js';
import NoteProvider from './contexts/NotesProvide.js';
import TodoScreen from './src/screen/TodoScreen.js';



type User = {
  name?: string;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NotesScreenComponent({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User>({});

  const findGreet = async () => {
    try {
      const result = await AsyncStorage.getItem('user');
      if (result) {
        setUser(JSON.parse(result));
      } else {
        console.warn('User data is null or undefined.');
      }
    } catch (error) {
      console.error('Error retrieving user from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    findGreet();
  }, []);

  const handleFinishIntro = () => {
    findGreet();
  };

  const renderNotesScreen = (props: any) => <NotesScreen {...props} user={user} />;

  if (!user.name) {
    return <Intro onFinish={handleFinishIntro} />;
  } else {
    return (
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
          <Stack.Screen name="NotesScreen" component={renderNotesScreen} />
          <Stack.Screen name="NotesDetail" component={NotesDetail} />
        </Stack.Navigator>
      </NoteProvider>
    );
  }
}

// function TodoScreen({ navigation }: { navigation: any }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Todo Screen</Text>
//       <TouchableOpacity onPress={() => navigation.navigate('AddNewTodo')}>
//         <Text>Add New Todo</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

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
      <NotesStack.Screen name="Notes" component={NotesScreenComponent} />
      <NotesStack.Screen name="AddNewNote" component={AddNewNoteScreen} />
    </NotesStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="TodoStack" component={TodoScreen} options={{ title: 'Todo' }} />
        <Tab.Screen name="NoteStack" component={NotesStackScreen} options={{ title: 'Notes' }} />
      </Tab.Navigator>
    </NavigationContainer>


  );
}

export default App;
