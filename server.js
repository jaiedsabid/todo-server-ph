const express = require('express');
const cors = require('cors');
const app = express();

const todoRoutes = require('./routes/todo');

app.use(cors());
app.use(express.json());

app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});