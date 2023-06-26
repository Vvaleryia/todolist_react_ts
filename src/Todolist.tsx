import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import EditableSpan from "./universal components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "./universal components/AddItemForm";
import {Task} from "./Task";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TasksType[]
    changeFilterTodolist: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTitleTask: (todolistId: string, taskId: string, newTitle: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newTitle: string) => void
}
export const Todolist = React.memo((props: TodolistPropsType) => {
    const onClickHandlerAll = useCallback(() => {
        props.changeFilterTodolist(props.todolistId, 'all')
    }, [props.changeFilterTodolist, props.todolistId])
    const onClickHandlerActive = useCallback(() => {
        props.changeFilterTodolist(props.todolistId, 'active')
    }, [props.changeFilterTodolist, props.todolistId])
    const onClickHandlerComplete = useCallback(() => {
        props.changeFilterTodolist(props.todolistId, 'complete')
    }, [props.changeFilterTodolist, props.todolistId])

    const onClickHandlerDeleteTodolist = () => {
        props.deleteTodolist(props.todolistId)
    }
    const addItem = useCallback((newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }, [props.addTask, props.todolistId])
    const onChangeTitleTodolist = useCallback((newTitle: string) => {
        props.changeTitleTodolist(props.todolistId, newTitle)
    }, [props.changeTitleTodolist, props.todolistId])

    let tasksForTodolist = props.tasks;
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'complete') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <div>
                <h3><EditableSpan value={props.title} onChangeTitle={onChangeTitleTodolist}/>
                    <IconButton onClick={onClickHandlerDeleteTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addItem}/>
                <div>
                    {tasksForTodolist.map((task) => <Task
                        key={task.id}
                        task={task}
                        todolistId={props.todolistId}
                        changeTitleTask={props.changeTitleTask}
                        changeTaskStatus={props.changeTaskStatus}
                        deleteTask={props.deleteTask}
                    />)}
                </div>
                <div>
                    <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                            onClick={onClickHandlerAll}>All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onClickHandlerActive}
                            color={'primary'}>Active
                    </Button>
                    <Button variant={props.filter === 'complete' ? 'outlined' : 'text'}
                            onClick={onClickHandlerComplete}
                            color={'secondary'}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
});





