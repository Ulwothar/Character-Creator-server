import express from 'express';
import { check } from 'express-validator';
import multer from 'multer';

import {
  addCharacter,
  //addSchool,
  deleteCharacter,
  getCharacter,
  getCharactersBy,
  levelUp,
  updateCharacter,
} from '../../controllers/character/characterController';

//multer options
const upload = multer({
  dest: 'images/characters',
});

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

router.get('/specific/:cc', getCharacter);

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

router.patch(
  '/level-up',
  check('characterCode').notEmpty(),
  check('level').isNumeric(),
  levelUp,
);

router.get('/characterstats', getCharactersBy);

router.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
});

//Deactivated due to changes made in character model. Not deleting, because this section will need to be discussed.
// router.patch(
//   '/add-school',
//   check('name').notEmpty(),
//   check('schoolId').notEmpty(),
//   check('characterCode').notEmpty(),
//   addSchool,
// );

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
 *      height:
 *        type: number
 *      weight:
 *        type: number
 *      description:
 *        type: string
 *      stats:
 *        type: array
 *        items:
 *          type: string
 *      skills:
 *        type: array
 *        items:
 *          type: string
 *      spellsId:
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
 * /character/characterstats:
 *  get:
 *    description: "Returns lists of characters grouped in provided categories. No query parameter added - returns all characters. If race, _class, level or nature are added to query, it will retrn all characters with specified stats."
 *    parameters:
 *    - in: "query"
 *      name: "race"
 *      description: "Returns all characters with specified race"
 *      schema:
 *        type: string
 *    - in: "query"
 *      name: "_class"
 *      description: "Returns all characters with specified class"
 *      schema:
 *        type: string
 *    - in: "query"
 *      name: "level"
 *      description: "Returns all characters with specified race"
 *      schema:
 *        type: number
 *    - in: "query"
 *      name: "nature"
 *      description: "Returns all characters with specified nature"
 *      schema:
 *        type: string
 *    - in: "query"
 *      name: "aggregate"
 *      description: "Triggers if returned data should be grouped together. If anything is passed here, the value is 'true'"
 *      schema:
 *        type: boolean
 *    responses:
 *      '200':
 *        description: "Characters returned successfuly"
 *      '404':
 *        description: "Characters not found"
 *      '500':
 *        description: "Server error"
 *
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
 *        default: 1
 *      height:
 *        type: number
 *      weight:
 *        type: number
 *      description:
 *        type: string
 *      stats:
 *        type: array
 *        items:
 *          type: string
 *      skills:
 *        type: array
 *        items:
 *          type: string
 *      spellsId:
 *          type: array
 *          items:
 *            type: string
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

/**
 * @swagger
 * /character/level-up:
 *  patch:
 *    description: "Updates character level"
 *    parameters:
 *    - in: "body"
 *      name: "levelUpdate"
 *      description: "Route used for updating level of character"
 *      schema:
 *        $ref: '#/definitions/levelUp'
 *    responses:
 *      '201':
 *        description: "Character level updated"
 *      '404':
 *        description: "Character does not exist"
 *      '406':
 *        description: "Invalid inputs, please fill in all required data"
 *      '500':
 *        description: "Server error, please try again"
 * definitions:
 *  levelUp:
 *    type: object
 *    properties:
 *      characterCode:
 *        type: string
 *        required: true
 *      level:
 *        type: number
 *        required: true
 */

//Not available due to other changes made, not deleting because this will still need to be discussed
//To activate this option in swagger, place '@swagger' on the line beefore '/character/add-school:'
/**
 *
 * /character/add-school:
 *  patch:
 *    description: "Adds new magic school to selected character"
 *    parameters:
 *    - in: "body"
 *      name: "addSchool"
 *      description: "Route used to add new magic school to a character"
 *      schema:
 *        $ref: '#/definitions/characterSchool'
 *    responses:
 *      '201':
 *        description: "School added successfully"
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: "Server error"
 * definitions:
 *  characterSchool:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      schoolId:
 *        type: string
 *      characterCode:
 *        type: string
 */
