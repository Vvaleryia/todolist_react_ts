import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

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
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={title}
                onChange={oncChangeHandlerTask}
                onKeyDown={onKeyDownHandlerTask}
                error={!!error}
                helperText={error}
            />
            <IconButton style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                        color='primary' onClick={addTask}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;