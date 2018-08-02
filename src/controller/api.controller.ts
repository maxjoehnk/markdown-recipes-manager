import { Router } from 'express';
import { listCategories } from '../handler/api.handler';

const api = Router();

api.get('/categories', (req, res) => {
    const categories = listCategories();

    res.json(categories);
    res.end();
});

export default api;
