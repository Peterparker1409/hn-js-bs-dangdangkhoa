const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const PORT = 3000;

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
