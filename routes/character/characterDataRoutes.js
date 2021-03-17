import express from 'express';
import { check } from 'express-validator';
import {
  addNature,
  addRace,
  addSkill,
  addStat,
  add_Class,
} from '../../controllers/characterData/characterDataController';

const router = express.Router();

router.post('/add-class', check('name').notEmpty(), add_Class);

router.post('/add-nature', check('name').notEmpty(), addNature);

router.post('/add-race', check('name').notEmpty(), addRace);

router.post('/add-skill', check('name').notEmpty(), addSkill);

router.post('/add-stat', check('name').notEmpty(), addStat);

export default router;
