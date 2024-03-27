import express from 'express';
import { getNewsByAuthor } from './author/getNewsByAuthor.js';
import { getArticle } from './author/getArticle.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true });
});

app.get('/news/:author', async (req, res) => {
    const data = await getNewsByAuthor(req.params.author);
    res.json(data);
});

app.get('/article', async (req, res) => {
    if (!req.query.url){
        res.status(400).json({ error: 'No url provided' });
    }
    const data = await getArticle(req.query.url);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});