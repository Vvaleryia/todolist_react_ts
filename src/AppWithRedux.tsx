import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducer/tasks/tasks-reducer";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC
} from "./reducer/todolists/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {AddItemForm} from "./universal components/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'complete';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistsType>>( state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks)

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    },[dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    },[dispatch])
    const changeTitleTask = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    },[dispatch])

    // crud operations with array todolists
    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    },[dispatch])
    const changeFilterTodolist = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(todolistId, value))
    },[dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    },[dispatch])
    const changeTitleTodolist = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTitleTodolistAC(todolistId, newTitle))
    },[dispatch])
    return (
        <div className='App'>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        <Button color={'inherit'}>Login</Button>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todo) => {
                            let tasksForTodolist = tasks[todo.id]//here are store filtered tasks
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist title={todo.title}
                                              key={todo.id}
                                              todolistId={todo.id}
                                              tasks={tasksForTodolist}
                                              deleteTask={deleteTask}
                                              changeFilterTodolist={changeFilterTodolist}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={todo.filter}
                                              deleteTodolist={deleteTodolist}
                                              changeTitleTask={changeTitleTask}
                                              changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
