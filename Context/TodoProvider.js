import React,{createContext, useState} from 'react';
import TodoContext from './TodoContext';

const TodoProvider =({children}) =>{
    const [counter,setCounter] = useState(0);
    
    const increaseCounterByOne = () =>{
        setCounter(counter+1);
    }
    return(
        <TodoContext.Provider value={{counter,increaseCounterByOne}} >
            {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider;
