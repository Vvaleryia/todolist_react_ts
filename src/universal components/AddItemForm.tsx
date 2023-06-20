import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
const AddItemForm = (props: AddItemFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')
    const oncChangeHandlerTask = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandlerTask = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem( title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={oncChangeHandlerTask}
                   onKeyDown={onKeyDownHandlerTask}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;