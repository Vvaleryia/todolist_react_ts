import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "I am sad", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "I have been better", isDone: false}
    ]
    return (
        <div className='App'>
            <Todolist title={'What to learn?'} tasks={tasks1}/>
            <Todolist title={'Choose your mood'} tasks={tasks1}/>
        </div>
    )
}

export default App;
