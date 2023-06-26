import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./universal components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./Todolist";

export type TaskPropsType = {
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTitleTask: (todolistId: string, taskId: string, newTitle: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    todolistId: string
    task: TasksType
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandlerDeleteTask = () => {
        props.deleteTask(props.todolistId, props.task.id)
    }
    const onChangeHandlerIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue)
    }
    const onChangeTitleTask = (newTitle: string) => {
        props.changeTitleTask(props.todolistId, props.task.id, newTitle)
    }
    return (
        <div key={props.task.id}>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeHandlerIsDoneTask}/>
            <EditableSpan value={props.task.title} onChangeTitle={onChangeTitleTask}/>
            <IconButton onClick={onClickHandlerDeleteTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})