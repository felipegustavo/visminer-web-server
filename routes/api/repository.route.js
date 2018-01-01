import express from 'express';

import RepositoryController from './../../controllers/repository.controller';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: RepositoryController.helloWord() });
});

export default router;
