import express from 'express';
import { check } from 'express-validator';

import { addCharacter, getCharacter } from '../controllers/characterController';

const router = express.Router();

router.post(
  '/',
  check('characterRace').notEmpty(),
  check('characterClass').notEmpty(),
  check('characterName').notEmpty(),
  addCharacter,
);

// cc - characterCode!

router.get('/:cc', getCharacter);

router.patch('/:cc');

router.delete('/:cc');

export default router;
