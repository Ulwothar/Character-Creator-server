import express from 'express';

import { characterFormData } from '../../controllers/characterData/characterDataController';

const router = express.Router();

/**
 * @swagger
 * /formdata/character:
 *  get:
 *      description: shows form data required for creating and updating characters
 *      responses:
 *          '200':
 *              description: Loaded character form data
 */
router.get('/character', characterFormData);

export default router;
