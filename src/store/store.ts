import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducer/tasks/tasks-reducer";
import {todolistsReducer} from "../reducer/todolists/todolists-reducer";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
        tasks: tasksReducer,
        todolists: todolistsReducer
    })
export const store = createStore(rootReducer)