import express from 'express';
import { check } from 'express-validator';

import { addCharacter } from '../controllers/characterController';

const router = express.Router();

router.post(
  '/',
  check('characterRace').notEmpty(),
  check('characterClass').notEmpty(),
  check('characterName').notEmpty(),
  addCharacter,
);

export default router;
