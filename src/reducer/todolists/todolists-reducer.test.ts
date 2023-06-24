import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodolistsType} from "../../App";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistsType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTitleTodolistAC(todolistId2, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'complete'

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})