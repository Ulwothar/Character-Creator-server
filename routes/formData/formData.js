import express from 'express';
import { check } from 'express-validator';

import {} from '../controllers/characterController';

const router = express.Router();

router.get('/character-data');

export default router;
