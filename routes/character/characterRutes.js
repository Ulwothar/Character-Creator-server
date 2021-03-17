import express from 'express';
import { check } from 'express-validator';

import {
  addCharacter,
  deleteCharacter,
  getCharacter,
  updateCharacter,
} from '../../controllers/character/characterController';

const router = express.Router();

router.post(
  '/',
  check('race').notEmpty(),
  check('_class').notEmpty(),
  check('name').notEmpty(),
  check('nature').notEmpty(),
  check('stats').isArray(),
  check('skills').isArray(),
  addCharacter,
);

// cc - characterCode!

router.get('/:cc', getCharacter);

router.patch(
  '/',
  check('race').notEmpty(),
  check('_class').notEmpty(),
  check('name').notEmpty(),
  check('nature').notEmpty(),
  check('stats').isArray(),
  check('skills').isArray(),
  check('characterCode').notEmpty(),
  check('level').isNumeric(),
  updateCharacter,
);

router.delete('/:cc', deleteCharacter);

export default router;
