import { Box, Checkbox, FormControlLabel, Paper, Button } from "@mui/material";
import { useMemo, useState } from "react";

type TodoItem = {
    id: number,
    name: string,
    completed: boolean,
}
const defaultTodos: TodoItem[] = [{ id: 1, name: 'Pay electric bill', completed: false }, { id: 2, name: 'Walk the dog', completed: false }];

enum FilterStatus {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETE = 'complete'
}

const TodoList = () => {
    const defaultTodosCompletedState = { [defaultTodos[0].id]: defaultTodos[0], [defaultTodos[1].id]: defaultTodos[1] };

    const [todosCompletedState, setTodosCompletedState] = useState<Record<number, TodoItem>>(defaultTodosCompletedState);
    const [newTodo, setNewTodo] = useState('');
    const [newTodoId, setNewTodoId] = useState(3);

    const [filter, setFilter] = useState(FilterStatus.ALL);
    const filteredTodos = useMemo(() => Object.fromEntries(Object.entries(todosCompletedState).filter(([_itemId, todoItem]) => {
        if (filter === FilterStatus.ACTIVE) {
            return !todoItem.completed;
        } else if (filter === FilterStatus.COMPLETE) {
            return todoItem.completed;
        } else {
            return true;
        }
    })), [todosCompletedState, filter]);

    const currentTodoList = Object.entries(filteredTodos);

    const completedTodos = (filter === FilterStatus.COMPLETE && filteredTodos) || Object.fromEntries(Object.entries(todosCompletedState).filter(([_itemId, todoItem]) => {
        return todoItem.completed;
    }));

    console.log('completedTodos', completedTodos, Object.keys(completedTodos));

    const buttonStyle = {
        padding: "4px",
        margin: '8px 12px',
        color: "white",
        "&:hover": {
            backgroundColor: "#1188e1",
        },
    };

    const renderFilterButtons = () => (<>
        <Button
            sx={{
                backgroundColor: filter === FilterStatus.ALL ? "#1188e1" : "#85949f",
                ...buttonStyle,
            }}
            onClick={() => setFilter(FilterStatus.ALL)}
        >
            All
        </Button>
        <Button
            sx={{
                backgroundColor: filter === FilterStatus.ACTIVE ? "#1188e1" : "#85949f",
                ...buttonStyle,
            }}
            onClick={() => setFilter(FilterStatus.ACTIVE)}
        >
            Active
        </Button>
        <Button
            sx={{
                backgroundColor: filter === FilterStatus.COMPLETE ? "#1188e1" : "#85949f",
                ...buttonStyle,
            }}
            onClick={() => setFilter(FilterStatus.COMPLETE)}
        >
            Completed
        </Button>
    </>)

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const todoItem = {
                id: newTodoId,
                name: newTodo,
                completed: false,
            };

            setTodosCompletedState({ ...todosCompletedState, [todoItem.id]: todoItem });

            setNewTodoId(newTodoId + 1);
            setNewTodo('');
        }
    };

    const handleClearCompleted = () => {
        const activeTodos = Object.fromEntries(Object.entries(todosCompletedState).filter(([_itemId, todoItem]) => {
            return !todoItem.completed;
        }));
        setTodosCompletedState(activeTodos);
    }

    const renderTodos = () => (<>
        {(currentTodoList).map(([itmId, todoItem]) => {
            const parsedItemId = parseInt(itmId);

            return (
                <li style={{ listStyleType: 'none', minWidth: '150px' }} className={todosCompletedState[parsedItemId].completed ? 'completed' : ''} >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={todosCompletedState[parsedItemId].completed}
                                onChange={() => {
                                    setTodosCompletedState({ ...todosCompletedState, [parsedItemId]: { ...todosCompletedState[parsedItemId], completed: !todosCompletedState[parsedItemId].completed } });
                                }}
                            />
                        }
                        label={todoItem.name}
                    />
                </li>
            )
        })}
    </>);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <Box textAlign='center' className='todo-list' mt={4}>
            <input
                type="text"
                value={newTodo}
                data-test={'new-todo'}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add a new to-do"
            />
            <button onClick={addTodo}>Add</button>

            {renderFilterButtons()}

            {Object.keys(completedTodos).length ?
                <Button
                    sx={{
                        backgroundColor: "white",
                        ...buttonStyle,
                        color: "#b7325f",
                        fontWeight: 600,
                    }}
                    onClick={handleClearCompleted}
                >
                    Clear completed
                </Button>
                : null}

            {renderTodos()}
        </Box>
    );
};

export default TodoList;
