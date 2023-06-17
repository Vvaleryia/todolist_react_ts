import React from 'react';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
}
const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id}><input type='checkbox' checked={task.isDone}/> <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;