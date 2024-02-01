import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import TodoListItem from "./TodoListItem";

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
    const defaultTodosList = { [defaultTodos[0].id]: defaultTodos[0], [defaultTodos[1].id]: defaultTodos[1] };

    const [todosList, setTodosList] = useState<Record<number, TodoItem>>(defaultTodosList);
    const [newTodo, setNewTodo] = useState('');
    const [newTodoId, setNewTodoId] = useState(3);

    const [filter, setFilter] = useState(FilterStatus.ALL);

    const currentTodoList = useMemo(() => {
        const filteredTodos = Object.entries(todosList).filter(([_itemId, todoItem]) => {
            if (filter === FilterStatus.ACTIVE) {
                return !todoItem.completed;
            } else if (filter === FilterStatus.COMPLETE) {
                return todoItem.completed;
            } else {
                return true;
            }
        })
        return filteredTodos;
    }, [todosList, filter]);

    const completedTodos = Object.fromEntries(Object.entries(todosList).filter(([_itemId, todoItem]) => {
        return todoItem.completed;
    }));

    const buttonStyle = {
        padding: "4px",
        margin: '8px 12px',
        color: "white",
        "&:hover": {
            backgroundColor: "#1188e1",
        },
    };

    const renderFilters = () => (<div>
        <Button
            sx={{ backgroundColor: filter === FilterStatus.ALL ? "#1188e1" : "#85949f", ...buttonStyle }}
            onClick={() => setFilter(FilterStatus.ALL)}
        >
            All
        </Button>
        <Button
            sx={{ backgroundColor: filter === FilterStatus.ACTIVE ? "#1188e1" : "#85949f", ...buttonStyle }}
            onClick={() => setFilter(FilterStatus.ACTIVE)}
        >
            Active
        </Button>
        <Button
            sx={{ backgroundColor: filter === FilterStatus.COMPLETE ? "#1188e1" : "#85949f", ...buttonStyle }}
            onClick={() => setFilter(FilterStatus.COMPLETE)}
        >
            Completed
        </Button>
    </div>)

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const todoItem = {
                id: newTodoId,
                name: newTodo,
                completed: false,
            };

            setTodosList({ ...todosList, [todoItem.id]: todoItem });
            setNewTodoId(newTodoId + 1);
            setNewTodo('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    const handleClearCompleted = () => {
        const activeTodos = Object.fromEntries(Object.entries(todosList).filter(([_itemId, todoItem]) => {
            return !todoItem.completed;
        }));
        setTodosList(activeTodos);
    };

    const renderNoItemsMessage = (filter: FilterStatus) => {
        let message = '';
        const noEmptyList = Object.keys(todosList).length;

        if (noEmptyList) {
            if (filter === FilterStatus.COMPLETE) {
                message = 'No completed items';
            } else if (filter === FilterStatus.ACTIVE) {
                message = 'No active items';
            }
        } else {
            message = 'No todo items'
        }

        return (<Typography sx={{ padding: '22px 38px', textAlign: 'left' }} variant="subtitle1">
            {message}
        </Typography>);
    };

    const handleCheckBoxChange = (listItemCompleted: boolean, parsedItemId: number) => {
        setTodosList({ ...todosList, [parsedItemId]: { ...todosList[parsedItemId], completed: !listItemCompleted } });
    };

    const renderTodosList = () => (
    <>
        {currentTodoList?.length 
            ?
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                padding: '0px 38px'
            }}>
                {currentTodoList.map(([itmId, todoItem]) => {
                    const parsedItemId = parseInt(itmId);

                    return <div key={itmId} >
                        <TodoListItem
                            listItemCompleted={todosList[parsedItemId].completed}
                            itemId={parsedItemId}
                            name={todoItem.name}
                            handleOnChange={handleCheckBoxChange}
                        />
                    </div>
                })}
            </div>
            : 
            renderNoItemsMessage(filter)}
    </>);

    const renderForm = () => (
        <Container maxWidth='sm' sx={{ width: '450px', display: 'flex', alignItems: 'center' }}>
            <TextField
                data-test={'new-todo'}
                sx={{ padding: '10px' }}
                onChange={(e) => setNewTodo(e.target.value)}
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

    const renderClearCompletedButton = () => {
        return Object.keys(completedTodos).length ?
            <Button
                sx={{
                    backgroundColor: "white",
                    ...buttonStyle,
                    color: "#b7325f",
                    fontWeight: 600,
                    "&:hover": {
                        backgroundColor: "#b7325f",
                        color: "white",
                    },
                }}
                onClick={handleClearCompleted}
            >
                Clear completed
            </Button>
            : null
    }

    return (
        <Box textAlign='center' className='todo-list' mt={4}>
            <>
                {renderForm()}

                <div style={{ display: 'flex', margin: '24px' }} className="buttons">
                    {renderFilters()}
                    {renderClearCompletedButton()}
                </div>

                {renderTodosList()}
            </>
        </Box>
    );
};

export default TodoList;
