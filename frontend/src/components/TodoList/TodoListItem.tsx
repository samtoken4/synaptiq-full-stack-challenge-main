
import { Checkbox, FormControlLabel } from "@mui/material";

interface TodoListItemProps {
    listItemCompleted: boolean;
    itemId: number;
    name: string;
    handleOnChange: (listItemCompleted: boolean, parsedItemId: number) => void;
};

const TodoListItem = ({ listItemCompleted, itemId, handleOnChange, name }: TodoListItemProps) => {
    return (<li style={{ listStyleType: 'none', minWidth: '150px' }} className={listItemCompleted ? 'completed' : ''} >
        <FormControlLabel
            control={
                <Checkbox
                    checked={listItemCompleted}
                    onChange={() => handleOnChange(listItemCompleted, itemId)}
                />
            }
            label={name}
        />
    </li>)
}

export default TodoListItem;