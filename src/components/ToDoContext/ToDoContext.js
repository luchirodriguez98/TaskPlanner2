import React from "react";
import { useLocalStorage } from "./UseLocalStorage";

const ToDoContext = React.createContext();

function ToDoProvider ({children}){

    //estado para contador

    const{item:toDos,saveItem:saveToDos, loading, error}=useLocalStorage('TODOS_V1',[]);

    const completedToDos = toDos.filter(toDo=> toDo.completed).length;
    const totalToDos= toDos.length;

    //estado para busqueda
    const [searchValue, setSearchValue] = React.useState('');


    //estado para lista
    const searchedToDos = toDos.filter(todo=>todo.text.toLowerCase().includes(searchValue.toLowerCase()));
    console.log(searchedToDos);

    //estado para items(marcar como hecho o eliminar)

    const completeToDos = (text) =>{

    const newToDos = [...toDos];
    const toDoIndex = newToDos.findIndex((toDo) => toDo.text === text);
    newToDos[toDoIndex].completed = true;

    saveToDos(newToDos);
    }

    const deleteToDos = (text) =>{

    const newToDos = [...toDos];
    const toDoIndex = newToDos.findIndex((toDo) => toDo.text === text);
    newToDos.splice(toDoIndex,1);

    saveToDos(newToDos);
    }


    return(
        <ToDoContext.Provider value={{completedToDos, totalToDos, searchValue, setSearchValue, searchedToDos, completeToDos, deleteToDos, loading, error}}>
            {children}
        </ToDoContext.Provider>
    )
}

export {ToDoContext, ToDoProvider}
