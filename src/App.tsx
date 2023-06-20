import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'complete';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string] : Array<TasksType>
}
function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    //all CRUD operation with associative array tasks
    const deleteTask = (todolistId: string, taskId: string) => {
        const todolistTask = tasks[todolistId]
        tasks[todolistId] = todolistTask.filter((task) => task.id !== taskId)
        setTasks({...tasks})
    }
    const changeFilterTasks = (todolistId: string, value: FilterValuesType) => {
        const findTdlst = todolists.find(todo => todo.id === todolistId)
        if (findTdlst) {
            findTdlst.filter = value;
            setTodolists([...todolists])
        }
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        const todolistTask = tasks[todolistId];
        tasks[todolistId] = [newTask, ...todolistTask]
        setTasks({...tasks})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const todolistTask = tasks[todolistId]
        const findTask = todolistTask.find(task => task.id === taskId)
        if (findTask) {
            findTask.isDone = isDone
            setTasks({...tasks})
        }
    }
    // crud operations with array todolists
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todo => todo.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    return (
        <div className='App'>
            {
                todolists.map(todo => {
                    let tasksForTodolist = tasks[todo.id]//here are store filtered tasks
                    if (todo.filter === 'active') {
                        tasksForTodolist = tasks[todo.id].filter(t => t.isDone)
                    }
                    if (todo.filter === 'complete') {
                        tasksForTodolist = tasks[todo.id].filter(t => !t.isDone)
                    }
                    return <Todolist title={todo.title}
                                     key={todo.id}
                                     todolistId={todo.id}
                                     tasks={tasksForTodolist}
                                     deleteTask={deleteTask}
                                     changeFilterTasks={changeFilterTasks}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todo.filter}
                                     deleteTodolist={deleteTodolist}
                    />
                })
            }
        </div>
    )
}

export default App;
