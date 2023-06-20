import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./universal components/AddItemForm";
import EditableSpan from "./universal components/EditableSpan";

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
    changeFilterTodolist: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
    changeTitleTask: (todolistId: string, taskId: string, newTitle: string) => void
    changeTitleTodolist: (todolistId: string, newTitle: string) => void
}
const Todolist = (props: TodolistPropsType) => {
    const onClickHandlerAll = () => {
        props.changeFilterTodolist(props.todolistId, 'all')
    }
    const onClickHandlerActive = () => {
        props.changeFilterTodolist(props.todolistId, 'active')
    }
    const onClickHandlerComplete = () => {
        props.changeFilterTodolist(props.todolistId, 'complete')
    }

    const onClickHandlerDeleteTodolist = () => {
        props.deleteTodolist(props.todolistId)
    }
    const addItem = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }
    const onChangeTitleTodolist = (newTitle: string) => {
        props.changeTitleTodolist(props.todolistId,newTitle)
    }
    return (
        <div>
            <div>
                <h3> <EditableSpan value={props.title} onChangeTitle={onChangeTitleTodolist}/>
                    <button onClick={onClickHandlerDeleteTodolist}>x</button>
                </h3>
                <AddItemForm addItem={addItem}/>
                <ul>
                    {props.tasks.map((task) => {
                        const onClickHandlerDeleteTask = () => {
                            props.deleteTask(props.todolistId, task.id)
                        }
                        const onChangeHandlerIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue)
                        }
                        const onChangeTitleTask = (newTitle: string) => {
                            props.changeTitleTask(props.todolistId, task.id, newTitle)
                        }
                        return (
                            <li key={task.id}>
                                <input type='checkbox'
                                       checked={task.isDone}
                                       onChange={onChangeHandlerIsDoneTask}/>
                                <EditableSpan value={task.title} onChangeTitle={onChangeTitleTask}/>
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