import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox, ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandlerTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandlerTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={title}
                onChange={onChangeHandlerTask}
                onKeyDown={onKeyDownHandlerTask}
                error={!!error}
                helperText={error}
            />
            <IconButton color='primary' onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>

});
