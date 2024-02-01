import { Button, Container, TextField } from "@mui/material";
import { buttonStyle } from "./TodoList";

const AddTodoForm = ({updateTodo, handleKeyPress, newTodo, addTodo}: {
    updateTodo: (value: string) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    newTodo: string;
    addTodo: () => void;
}) => (
    <Container maxWidth='sm' sx={{ width: '450px', display: 'flex', alignItems: 'center' }}>
        <TextField
            data-test={'new-todo'}
            sx={{ padding: '10px' }}
            onChange={(e) => updateTodo(e.target.value)}
            variant='outlined'
            fullWidth
            margin='normal'
            value={newTodo}
            onKeyDown={handleKeyPress}
            placeholder="New todo item"
        />
        <Button sx={{
            ...buttonStyle,
            height: '32px',
            color: "black",
            fontWeight: 600,
            backgroundColor: "#c2bfbf",
            "&:hover": {
                backgroundColor: "#c2bfbf",
            }
        }} onClick={addTodo}>Add</Button>
    </Container>

);

export default AddTodoForm;