import React from 'react';
import {FilterValuesType} from "./App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    deleteTask: (taskId: number) => void
    changeFilter: (value: FilterValuesType) => void
}
const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type='checkbox' checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => {props.deleteTask(task.id)}}>x</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => {props.changeFilter('all')} }>All</button>
                    <button onClick={() => {props.changeFilter('active')} }>Active</button>
                    <button onClick={() => {props.changeFilter('complete')} }>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;