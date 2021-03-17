import express from 'express';

import { characterFormData } from '../../controllers/characterData/characterDataController';

const router = express.Router();

router.get('/character', characterFormData);

export default router;
