import {FilterValuesType, TodolistsType} from "../../App";
import {v1} from "uuid";

type ActionsType = deleteTodolistAT | addTodolistAT | changeTitleTodolistAT | changeFilterTodolistAT;
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType) => {
    switch (action.type) {
        case 'DELETE-TODOLIST'  : {
            return state.filter(todo => todo.id !== action.todolistId)
        }
        case 'ADD-TODOLIST'  : {
            const newTodolist = {id: action.todolistId, title: action.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TITLE-TODOLIST' : {
            const findTodolist = state.find(todo => todo.id === action.todolistId)
            if (findTodolist) {
                findTodolist.title = action.newTitle
            }
            return [...state]
        }
        case 'CHANGE-FILTER-TODOLIST' : {
            const findTodolist = state.find(todo => todo.id === action.todolistId)
            if (findTodolist) {
                findTodolist.filter = action.newFilter
            }
            return [...state]
        }
        default:
            return state
    }
}

export type deleteTodolistAT = {
    type: 'DELETE-TODOLIST'
    todolistId: string
}
export const deleteTodolistAC = (todolistId: string): deleteTodolistAT => {
    return ({
        type: 'DELETE-TODOLIST' as const,
        todolistId
    })
}

export type addTodolistAT = {
    type: 'ADD-TODOLIST',
    newTitle: string
    todolistId: string
}

export const addTodolistAC = (newTitle: string): addTodolistAT => {
    return ({
        type: 'ADD-TODOLIST' as const,
        newTitle,
        todolistId: v1()
    })
}

export type changeTitleTodolistAT = {
    type: 'CHANGE-TITLE-TODOLIST'
    todolistId: string
    newTitle: string
}

export const changeTitleTodolistAC = (todolistId: string, newTitle: string): changeTitleTodolistAT => {
    return ({
        type: 'CHANGE-TITLE-TODOLIST' as const,
        todolistId,
        newTitle
    })
}

export type changeFilterTodolistAT = {
    type: 'CHANGE-FILTER-TODOLIST'
    todolistId: string
    newFilter: FilterValuesType
}

export const changeFilterTodolistAC = (todolistId: string, newFilter: FilterValuesType): changeFilterTodolistAT => {
    return ({
        type: 'CHANGE-FILTER-TODOLIST' as const,
        todolistId,
        newFilter
    })
}