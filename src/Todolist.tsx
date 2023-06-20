import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TasksType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilterTasks: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
}
const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onClickHandlerAll = () => {
        props.changeFilterTasks(props.todolistId, 'all')
    }
    const onClickHandlerActive = () => {
        props.changeFilterTasks(props.todolistId, 'active')
    }
    const onClickHandlerComplete = () => {
        props.changeFilterTasks(props.todolistId, 'complete')
    }
    const oncChangeHandlerTask = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandlerTask = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onClickHandlerDeleteTodolist = () => {
        props.deleteTodolist(props.todolistId)
    }
    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={onClickHandlerDeleteTodolist}>x</button>
                </h3>
                <div>
                    <input value={title}
                           onChange={oncChangeHandlerTask}
                           onKeyDown={onKeyDownHandlerTask}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        const onClickHandlerDeleteTask = () => {
                            props.deleteTask(props.todolistId, task.id)
                        }
                        const onChangeHandlerIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue)
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
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickHandlerAll}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onClickHandlerActive}>Active
                    </button>
                    <button className={props.filter === 'complete' ? 'active-filter' : ''}
                            onClick={onClickHandlerComplete}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;