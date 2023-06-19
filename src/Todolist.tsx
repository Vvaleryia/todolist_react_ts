import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    deleteTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onClickHandlerAll = () => {
        props.changeFilter('all')
    }
    const onClickHandlerActive = () => {
        props.changeFilter('active')
    }
    const onClickHandlerComplete = () => {
        props.changeFilter('complete')
    }
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => {
                               setTitle(event.currentTarget.value)
                           }}
                           onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                               if (event.key === 'Enter') {
                                   addTask()
                               }
                           }}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        const onClickHandlerDeleteTask = () => {
                            props.deleteTask(task.id)
                        }
                        const onChangeHandlerIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, newIsDoneValue)
                        }
                        return (
                            <li key={task.id}>
                                <input type='checkbox'
                                       checked={task.isDone}
                                       onChange={onChangeHandlerIsDoneTask}/>
                                <span>{task.title}</span>
                                <button onClick={onClickHandlerDeleteTask}>x
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={onClickHandlerAll}>All</button>
                    <button onClick={onClickHandlerActive}>Active</button>
                    <button onClick={onClickHandlerComplete}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;