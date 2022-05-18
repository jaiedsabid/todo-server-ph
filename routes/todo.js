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
    todo.done = false;
    todos.push(todo);
    
    return res.json(todo);
});

// Done todo
router.patch('/done', (req, res) => {
    const id = req.body?.id;

    if (! id) {
        return res.status(400).json({
            error: 'Id is required',
        });
    }

    const index = todos.findIndex(t => parseInt(t.id) === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            error: 'Todo not found',
        });
    }

    todos[index].done = true;

    return res.json(todos[index]);
});

// Delete todo
router.delete('/delete', (req, res) => {
    const id = req.body?.id;

    if (! id) {
        return res.status(400).json({
            error: 'Id is required',
        });
    }

    const index = todos.findIndex(t => parseInt(t.id) === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            error: 'Todo not found',
        });
    }

    todos.splice(index, 1);

    return res.sendStatus(200);
});

module.exports = router;