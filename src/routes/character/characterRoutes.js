import express from 'express';
import { check } from 'express-validator';
import multer from 'multer';
import { characterFormData } from '../../controllers/characterData/characterDataController';

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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/characters/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //if no image was sent, return true with no error - image is not required
  if (!file) {
    cb(null, true);
  }

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Replace 'localhost:4000' with your domain name for production
    req.body.image = `http://cc.mattkrp.co.uk/images/characters/${file.originalname}`;
    console.log(req.body);
    cb(null, true);
  } else {
    cb('Please send only images with jpg or png extensions', false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const router = express.Router();

router.post(
  '/',
  upload.single('image'),
  check('race').notEmpty(),
  check('_class').notEmpty(),
  check('name').notEmpty(),
  check('nature').notEmpty(),
  check('stats').exists(),
  check('skills').exists(),
  check('gender').notEmpty(),
  addCharacter,
);

// cc - characterCode!

router.get('/specific/:cc', getCharacter);

router.patch(
  '/',
  upload.single('image'),
  check('race').notEmpty(),
  check('_class').notEmpty(),
  check('name').notEmpty(),
  check('nature').notEmpty(),
  check('stats').exists(),
  check('skills').exists(),
  check('characterCode').notEmpty(),
  check('level').isNumeric(),
  check('gender').notEmpty(),
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
  console.log(req.file);
  res.send();
});

router.get('/form', characterFormData);

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
 *    consumes:
 *      - multipart/form-data
 *    produces: "application/json"
 *    parameters:
 *    - in: "formData"
 *      name: "image"
 *      type: file
 *      required: false
 *      description: "Upload image or provide link to an image for character avatar"
 *    - in: "formData"
 *      name: "onlineImage"
 *      type: string
 *      required: false
 *      description: "Link to www image"
 *    - in: "formData"
 *      name: "name"
 *      type: string
 *      required: true
 *      description: "Name of the character"
 *    - in: "formData"
 *      name: "race"
 *      type: string
 *      required: true
 *      description: "Race of the character"
 *    - in: "formData"
 *      name: "_class"
 *      type: string
 *      required: true
 *      description: "Class of the character"
 *    - in: "formData"
 *      name: "nature"
 *      type: string
 *      required: true
 *      description: "Nature of the character"
 *    - in: "formData"
 *      name: "gender"
 *      type: string
 *      required: true
 *      description: "Gender of the character"
 *    - in: "formData"
 *      name: "height"
 *      type: number
 *      required: false
 *      description: "Height of the character"
 *    - in: "formData"
 *      name: "weight"
 *      type: number
 *      required: false
 *      description: "Weight of the character"
 *    - in: "formData"
 *      name: "description"
 *      type: string
 *      required: false
 *      description: "Character's description"
 *    - in: "formData"
 *      name: "stats"
 *      type: string
 *      required: true
 *      description: "Character's stats - list of stats, separated with coma - stat1, stat2, stat3, ..."
 *    - in: "formData"
 *      name: "skills"
 *      type: string
 *      required: true
 *      description: "Character's skills, separated with coma - skill1, skill2, skill3, ..."
 *    - in: "formData"
 *      name: "spellsId"
 *      type: string
 *      required: false
 *      description: "Character's spells, separated with coma - spell1, spell2, spell3, ..."
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
 *      gender:
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
 *      - gender
 *      - stats
 *      - skills
 *
 */

/**
 * @swagger
 * /character/specific/{cc}:
 *  get:
 *    name: Get character by character code
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
 *      '400':
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
 *      description: "Triggers if returned data should be grouped together for statistic purposes. Returns data grouped by race, class, level, nature and name, and counts all returned characters. If anything is passed here, the value is 'true'"
 *      schema:
 *        type: boolean
 *    - in: "query"
 *      name: "groupCharacters"
 *      description: "Returns all characters for which all query params are valid. There are only a few params available here, but anything can be passed as parameter and if those are valid, data wil be returned. If anything is passed here, the value is 'true'"
 *      schema:
 *        type: boolean
 *    responses:
 *      '200':
 *        description: "Characters returned successfuly"
 *      '400':
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
 *    consumes:
 *      - multipart/form-data
 *    produces: "application/json"
 *    parameters:
 *    - in: "formData"
 *      name: "image"
 *      type: file
 *      required: false
 *      description: "Upload image or provide link to an image for character avatar"
 *    - in: "formData"
 *      name: "onlineImage"
 *      type: string
 *      required: false
 *      description: "Link to www image"
 *    - in: "formData"
 *      name: "characterCode"
 *      type: string
 *      required: true
 *      description: "character code - used as character id for front-end and can not be changed"
 *    - in: "formData"
 *      name: "name"
 *      type: string
 *      required: true
 *      description: "Name of the character"
 *    - in: "formData"
 *      name: "race"
 *      type: string
 *      required: true
 *      description: "Race of the character"
 *    - in: "formData"
 *      name: "_class"
 *      type: string
 *      required: true
 *      description: "Class of the character"
 *    - in: "formData"
 *      name: "nature"
 *      type: string
 *      required: true
 *      description: "Nature of the character"
 *    - in: "formData"
 *      name: "level"
 *      type: number
 *      required: true
 *      description: "Level of the character(experience)"
 *    - in: "formData"
 *      name: "gender"
 *      type: string
 *      required: true
 *      description: "Gender of the character"
 *    - in: "formData"
 *      name: "height"
 *      type: number
 *      required: false
 *      description: "Height of the character"
 *    - in: "formData"
 *      name: "weight"
 *      type: number
 *      required: false
 *      description: "Weight of the character"
 *    - in: "formData"
 *      name: "description"
 *      type: string
 *      required: false
 *      description: "Character's description"
 *    - in: "formData"
 *      name: "stats"
 *      type: string
 *      required: true
 *      description: "Character's stats - list of stats, separated with coma - stat1, stat2, stat3, ..."
 *    - in: "formData"
 *      name: "skills"
 *      type: string
 *      required: true
 *      description: "Character's skills, separated with coma - skill1, skill2, skill3, ..."
 *    - in: "formData"
 *      name: "spellsId"
 *      type: string
 *      required: false
 *      description: "Character's spells, separated with coma - spell1, spell2, spell3, ..."
 *    responses:
 *      '201':
 *        description: Character updated successfully!
 *      '400':
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
 *      gender:
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
 *      - gender
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
 *      '400':
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
 *      '400':
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
 *      '400':
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
 *
 * @swagger
 * /character/form:
 *  get:
 *      description: shows form data required for creating and updating characters
 *      responses:
 *          '200':
 *              description: Loaded character form data
 *          '500':
 *              description: Internal server error, please try again
 */
