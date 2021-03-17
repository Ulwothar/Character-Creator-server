import express from 'express';
import { check } from 'express-validator';
import { add_Class } from '../../controllers/characterData/characterDataController';

const router = express.Router();

router.post('/add-class', check('name').notEmpty(), add_Class);

router.post('/add-nature', check('name').notEmpty(), add_Class);

router.post('/add-race', check('name').notEmpty(), add_Class);

router.post('/add-skill', check('name').notEmpty(), add_Class);

router.post('/add-stat', check('name').notEmpty(), add_Class);

export default router;
