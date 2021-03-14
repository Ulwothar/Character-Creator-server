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
  check('characterRace').notEmpty(),
  check('characterClass').notEmpty(),
  check('characterName').notEmpty(),
  check('character').notEmpty(),
  check('characterStats').isArray(),
  check('characterSkills').isArray(),
  addCharacter,
);

// cc - characterCode!

router.get('/:cc', getCharacter);

router.patch('/:cc');

router.delete('/:cc', deleteCharacter);

export default router;
