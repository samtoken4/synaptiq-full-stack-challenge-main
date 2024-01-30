import { Box, Typography, Checkbox, FormControlLabel, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface TodoListProps {

}
const TodoList = () => {

    const defaultTodos = ['Pay electric bill', 'Walk the dog'];

    const defaultTodosCheckedState = { [defaultTodos[0]]: false, [defaultTodos[1]]: false }
    const [newTodo, setNewTodo] = useState('');

    const [todosState, setTodosState] = useState<Record<string, boolean>>(defaultTodosCheckedState)

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodosState({ ...todosState, [newTodo]: false });
            setNewTodo('');
        }
    };

    const renderTodos = () => (<Paper sx={{ paddingLeft: 2, display: 'flex', flexDirection: 'column', width: '130px', margin: '12px 48px' }}>
        {defaultTodos.map((todo) => (
            <li>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={todosState[todo]}
                            onChange={() => {
                                setTodosState({ ...todosState, [todo]: !todosState[todo] });
                            }}
                        />
                    }
                    label={todo}
                />
            </li>
        )
        )}
    </Paper>)

    return (
        <Box textAlign='center' className='todo-list' mt={4}>
            <input
                type="text"
                value={newTodo}
                data-test={'new-todo'}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new to-do"
            />
            <button onClick={addTodo}>Add</button>
            {renderTodos()}
        </Box>
    );
};

export default TodoList;
