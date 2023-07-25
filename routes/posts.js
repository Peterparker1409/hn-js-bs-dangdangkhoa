const express = require('express');
const router = express.Router();
const fs = require('fs');

let postsData = JSON.parse(fs.readFileSync('Posts.json', 'utf8'));

router.get('/', (req, res) => {
    res.json(postsData);
});

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    const post = postsData.find((post) => post.id === parseInt(postId));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: postsData.length + 1, title, content };
    postsData.push(newPost);
    fs.writeFileSync('Posts.json', JSON.stringify(postsData, null, 2));
    res.json(newPost);
});

router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const postIndex = postsData.findIndex((post) => post.id === parseInt(postId));
    if (postIndex !== -1) {
        postsData[postIndex].title = title;
        postsData[postIndex].content = content;
        fs.writeFileSync('Posts.json', JSON.stringify(postsData, null, 2));
        res.json(postsData[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    postsData = postsData.filter((post) => post.id !== parseInt(postId));
    fs.writeFileSync('Posts.json', JSON.stringify(postsData, null, 2));
    res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
