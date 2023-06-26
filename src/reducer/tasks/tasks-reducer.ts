import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {addTodolistAT, deleteTodolistAT} from "../todolists/todolists-reducer";

type ActionsType = removeTaskAT |
    addTaskAT |
    changeTaskStatusAT |
    changeTaskTitleAT |
    deleteTodolistAT |
    addTodolistAT;

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(task => task.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK' : {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.newTitle, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS' : {
            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map((t) => t.id === action.taskId
                ? {...t, isDone: action.newFilter}
                : t
            )
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE' : {
            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map((t) => t.id === action.taskId
                ? {...t, title: action.newTitle}
                : t
            )
            return ({...state})
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'DELETE-TODOLIST' : {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId]
            return stateCopy;
        }
        default:
            return state
    }
}
type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAT => {
    return ({
        type: 'REMOVE-TASK' as const,
        todolistId,
        taskId
    })
}
type addTaskAT = {
    type: 'ADD-TASK'
    todolistId: string
    newTitle: string
}
export const addTaskAC = (todolistId: string, newTitle: string): addTaskAT => {
    return {type: 'ADD-TASK', todolistId, newTitle}
}

type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    newFilter: boolean
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newFilter: boolean): changeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, newFilter}
}

type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTitle: string
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): changeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle}
}