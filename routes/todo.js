const express = require('express');
const router = express.Router();

let todos = [
    {
        id: 1,
        name: 'Learn NodeJS',
        description: 'Need to learn basics of NodeJS',
        done: true
    }
]

// GET /todos
router.get('/', (req, res) => {
    return res.json(todos);
});

// Add todo
router.post('/add', (req, res) => {
    const todo = req.body;

    if (! todo?.name  || ! todo?.description) {
        return res.status(400).json({
            error: 'Name and description are required',
            data: req.body
        });
    }

    todo.id = todos.length + 1;
    todos.push(todo);
    
    return res.json(todo);
});

// Done todo
router.patch('/done', (req, res) => {
    const todo = req.body;

    if (! todo?.id) {
        return res.status(400).json({
            error: 'Id is required',
            data: req.body
        });
    }

    const index = todos.findIndex(t => t.id === todo.id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Todo not found',
            data: req.body
        });
    }

    todos[index].done = true;

    return res.json(todo);
});

// Delete todo
router.delete('/delete', (req, res) => {
    const todo = req.body;

    if (! todo?.id) {
        return res.status(400).json({
            error: 'Id is required',
            data: req.body
        });
    }

    const index = todos.findIndex(t => t.id === todo.id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Todo not found',
            data: req.body
        });
    }

    todos.splice(index, 1);

    return res.json(todo);
});

module.exports = router;