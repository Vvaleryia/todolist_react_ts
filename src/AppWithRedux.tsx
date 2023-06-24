import React from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import AddItemForm from "./universal components/AddItemForm";
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
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeTitleTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    // crud operations with array todolists
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }
    const changeFilterTodolist = (todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(todolistId, value))
    }
    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }
    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        dispatch(changeTitleTodolistAC(todolistId, newTitle))
    }
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
                            if (todo.filter === 'active') {
                                tasksForTodolist = tasks[todo.id].filter(t => !t.isDone)
                            }
                            if (todo.filter === 'complete') {
                                tasksForTodolist = tasks[todo.id].filter(t => t.isDone)
                            }
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
