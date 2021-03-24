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
  check('stats').exists(),
  check('skills').exists(),
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

/**
 * @swagger
 *
 * /character:
 *   post:
 *    description: "Use to create a new character"
 *    consumes: "application/json"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "createCharacter"
 *      description: "Create new character here"
 *      schema:
 *        $ref: '#/definitions/newCharacter'
 *    responses:
 *      '201':
 *        description: Character created successfully!
 *      '406':
 *        description: Invalid inputs.
 *      '500':
 *        description: server error.
 * definitions:
 *  newCharacter:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      race:
 *        type: string
 *      _class:
 *        type: string
 *      nature:
 *        type: string
 *      stats:
 *        type: array
 *        items:
 *          type: string
 *      skills:
 *        type: array
 *        items:
 *          type: string
 *    required:
 *      - name
 *      - _class
 *      - race
 *      - nature
 *      - stats
 *      - skills
 *
 */

/**
 * @swagger
 * /character/{cc}:
 *  get:
 *    description: provides all data for specific character
 *    parameters:
 *      - name: cc
 *        in: path
 *        description: Character Code
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Loaded character data.
 *      '404':
 *        description: Character Code invalid.
 *      '500':
 *        description: Internal server error.
 */

/**
 * @swagger
 *
 * /character:
 *   patch:
 *    description: "Use to update an existing character"
 *    consumes: "application/json"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "updateCharacter"
 *      description: "Character Update Route"
 *      schema:
 *        $ref: '#/definitions/updatedCharacter'
 *    responses:
 *      '201':
 *        description: Character updated successfully!
 *      '406':
 *        description: Invalid inputs.
 *      '500':
 *        description: server error.
 * definitions:
 *  updatedCharacter:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      race:
 *        type: string
 *      _class:
 *        type: string
 *      nature:
 *        type: string
 *      characterCode:
 *        type: string
 *      level:
 *        type: number
 *      stats:
 *        type: array
 *        items:
 *          type: string
 *      skills:
 *        type: array
 *        items:
 *          type: string
 *    required:
 *      - name
 *      - _class
 *      - race
 *      - nature
 *      - stats
 *      - skills
 *      - level
 *      - characterCode
 *
 */

/**
 * @swagger
 * /character/{cc}:
 *  delete:
 *    description: Deletes a specific character
 *    parameters:
 *      - name: cc
 *        in: path
 *        description: Character Code
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Character successfully deleted .
 *      '404':
 *        description: Character Code invalid.
 *      '500':
 *        description: Internal server error.
 */
