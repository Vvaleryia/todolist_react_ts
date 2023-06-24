import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./universal components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducer/tasks/tasks-reducer";
import {
    addTodolistAC,
    changeFilterTodolistAC, changeTitleTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./reducer/todolists/todolists-reducer";

export type FilterValuesType = 'all' | 'active' | 'complete';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRecuder() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTask] = useReducer(tasksReducer,{
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

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTask(removeTaskAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, title: string) => {
       dispatchToTask(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
       dispatchToTask(changeTaskStatusAC(todolistId,taskId,isDone))
    }
    const changeTitleTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTask(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    // crud operations with array todolists
    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
        dispatchToTask(deleteTodolistAC(todolistId))
    }
    const changeFilterTodolist = (todolistId: string, value: FilterValuesType) => {
       dispatchToTodolists(changeFilterTodolistAC(todolistId,value))
    }
    const addTodolist = (newTitle: string) => {
        dispatchToTodolists(addTodolistAC(newTitle))
        dispatchToTask(addTodolistAC(newTitle))
    }
    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTitleTodolistAC(todolistId, newTitle))
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

    export default AppWithRecuder;
