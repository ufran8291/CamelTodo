import EntypoIcon from 'react-native-vector-icons/Entypo';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Assuming you have your image in assets folder
const NoTasksImage = require('../assets/todoimage.jpg');

const TodoScreen = () => {
    const [todo, setTodo] = useState('');
    const [todolist, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [tasksPresent, setTasksPresent] = useState(false); // Initialize as false
    const [firstLoad, setFirstLoad] = useState(true); // To track if it's the first load

    useEffect(() => {
        getTodoList();
    }, []);

    const saveTodoList = async (todos) => {
        try {
            const jsonTodos = JSON.stringify(todos);
            await AsyncStorage.setItem('todoList', jsonTodos);
        } catch (e) {
            console.error('Error saving todos', e.message);
        }
    };

    const getTodoList = async () => {
        try {
            const jsonTodos = await AsyncStorage.getItem('todoList');
            if (jsonTodos !== null) {
                setTodoList(JSON.parse(jsonTodos));
            }
            checkTasksPresent(JSON.parse(jsonTodos));
        } catch (e) {
            console.error('Error loading todos', e.message);
        }
    };

    const checkTasksPresent = (todos) => {
        if (todos && todos.length > 0) {
            setTasksPresent(true); // There are tasks
        } else {
            setTasksPresent(false); // No tasks, show image
        }
    };

    const handleAddTodo = () => {
        if (todo === '') {
            return;
        }
        if (todo.trim() !== '') {
            const newTodo = { id: Date.now().toString(), title: todo, taskCompleted: false };
            const updatedTodoList = [...todolist, newTodo];
            setTodoList(updatedTodoList);
            saveTodoList(updatedTodoList);
            setTodo('');
            checkTasksPresent(updatedTodoList);
        }
    };

    const handleUpdateTodo = () => {
        const updatedTodos = todolist.map((item) => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todo };
            }
            return item;
        });
        setTodoList(updatedTodos);
        saveTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo('');
        checkTasksPresent(updatedTodos);
    };

    const handleDeleteTodo = (id) => {
        const updatedTodoList = todolist.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
        saveTodoList(updatedTodoList);
        checkTasksPresent(updatedTodoList);
    };

    const handleEditTodo = (todo) => {
        setEditedTodo(todo);
        setTodo(todo.title);
    };

    const handleTaskComplete = (id) => {
        const updatedTodos = todolist.map((item) => {
            if (item.id === id) {
                return { ...item, taskCompleted: !item.taskCompleted };
            }
            return item;
        });
        setTodoList(updatedTodos);
        saveTodoList(updatedTodos);
        checkTasksPresent(updatedTodos);
    };

    const RenderTodos = ({ item }) => {
        const iconColor = item.taskCompleted ? '#5cb85c' : '#1e90ff';
        return (
            <View style={styles.todoItem}>
                <TouchableOpacity onPress={() => handleTaskComplete(item.id)}>
                    <EntypoIcon name={item.taskCompleted ? 'check' : 'circle'} size={24} color={iconColor} />
                </TouchableOpacity>
                <Text style={styles.todoText}>{item.title}</Text>
                <TouchableOpacity onPress={() => handleEditTodo(item)}>
                    <EntypoIcon name="edit" size={20} color="#333" style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                    <EntypoIcon name="cross" size={20} color="#333" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
        );
    };

    useEffect(() => {
        // On the first load, setTasksPresent to false to show the image
        if (firstLoad) {
            setTasksPresent(false);
            setFirstLoad(false);
        }
    }, [firstLoad]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>CheckMate</Text>
            <TextInput
                style={styles.input}
                placeholder="What is the task Today?"
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={editedTodo ? handleUpdateTodo : handleAddTodo}
            >
                <Text style={styles.buttonText}>{editedTodo ? 'Save' : 'Add'}</Text>
            </TouchableOpacity>

            <View style={styles.listContainer}>
                {/* Conditionally render the image when no tasks */}
                {!tasksPresent && (
                    <View style={styles.imageContainer}>
                        <Image source={NoTasksImage} style={styles.image} />
                    </View>
                )}

                {/* Show Todo Tasks when tasks are present */}
                {tasksPresent && (
                    <View>
                        <Text style={styles.sectionHeading}>To Do Tasks</Text>
                        {todolist.filter(task => !task.taskCompleted).length === 0 ? (
                            <View style={styles.emptyList}>
                                <Text style={styles.emptyListText}>No tasks to show</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={todolist.filter(task => !task.taskCompleted)}
                                renderItem={RenderTodos}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </View>
                )}

                {/* Show Completed Tasks when tasks are present */}
                {tasksPresent && (
                    <View>
                        <Text style={styles.sectionHeading}>Completed Tasks</Text>
                        {todolist.filter(task => task.taskCompleted).length === 0 ? (
                            <View style={styles.emptyList}>
                                <Text style={styles.emptyListText}>No tasks to show</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={todolist.filter(task => task.taskCompleted)}
                                renderItem={RenderTodos}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 80,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6a0dad',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
        color: '#333',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#6a0dad',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    todoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    emptyList: {
        backgroundColor: '#d3f7c8',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    emptyListText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1e90ff',
        marginTop: 20,
        paddingHorizontal: 16,
    },
    listContainer: {
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    image: {
        width: 350,
        height: 350,
    },
});

export default TodoScreen;
