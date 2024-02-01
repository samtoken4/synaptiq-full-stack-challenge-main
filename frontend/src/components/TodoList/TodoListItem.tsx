import { Checkbox, FormControlLabel, TableRow, TableCell } from "@mui/material";

interface TodoListItemProps {
    listItemCompleted: boolean;
    itemId: number;
    name: string;
    handleOnChange: (listItemCompleted: boolean, parsedItemId: number) => void;
};

const TodoListItem = ({ listItemCompleted, itemId, handleOnChange, name }: TodoListItemProps) => {
    return (
        <TableRow
            style={{ width: '300px' }}
            className={listItemCompleted ? 'completed' : ''}
        >
            <TableCell style={{ width: '300px' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={listItemCompleted}
                            onChange={() => handleOnChange(listItemCompleted, itemId)}
                        />
                    }
                    label={name}
                />
            </TableCell>
        </TableRow>
    );
}

export default TodoListItem;
