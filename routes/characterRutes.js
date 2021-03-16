import express from 'express';
import { check } from 'express-validator';

import {
  addCharacter,
  deleteCharacter,
  getCharacter,
} from '../controllers/characterController';

const router = express.Router();

router.post(
  '/',
  check('race').notEmpty(),
  check('_class').notEmpty(),
  check('name').notEmpty(),
  check('character').notEmpty(),
  check('stats').isArray(),
  check('skills').isArray(),
  addCharacter,
);

// cc - characterCode!

router.get('/:cc', getCharacter);

router.patch('/:cc');

router.delete('/:cc', deleteCharacter);

export default router;
