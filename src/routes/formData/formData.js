import express from 'express';

import { characterFormData } from '../../controllers/characterData/characterDataController';

const router = express.Router();

router.get('/character', characterFormData);

export default router;

/**
 * @swagger
 * /formdata/character:
 *  get:
 *      description: shows form data required for creating and updating characters
 *      responses:
 *          '200':
 *              description: Loaded character form data
 *          '500':
 *              description: Internal server error, please try again
 */
