import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'complete';

function App() {

    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const deleteTask = (taskId: string) => {
        const findTask = tasks.filter((task) => task.id !== taskId)
        setTasks(findTask)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const findTask = tasks.find(task => task.id === taskId)
        if (findTask) {
            findTask.isDone = isDone
        }
    }

    let tasksForTodolist = tasks//here are store filtered shuffles
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'complete') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className='App'>
            <Todolist title={'What to learn?'}
                      tasks={tasksForTodolist}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App;
