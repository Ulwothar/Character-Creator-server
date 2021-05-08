import express from 'express';
import { check } from 'express-validator';
import {
  addNature,
  addRace,
  addSchool,
  addSkill,
  addSpell,
  addStat,
  add_Class,
  deleteNature,
  deleteRace,
  deleteSchool,
  deleteSkill,
  deleteSpell,
  deleteStat,
  delete_Class,
} from '../../controllers/characterData/characterDataController';

const router = express.Router();

router.post('/add-class', check('name').notEmpty(), add_Class);
router.delete('/delete-class', check('name').notEmpty(), delete_Class);

router.post('/add-nature', check('name').notEmpty(), addNature);
router.delete('/delete-nature', check('name').notEmpty(), deleteNature);

router.post(
  '/add-race',
  check('name').notEmpty(),
  check('description').notEmpty(),
  check('specialRules').notEmpty(),
  check('psychologicalTraits').notEmpty(),
  check('modifiers').isArray(),
  addRace,
);
router.delete('/delete-race', check('name').notEmpty(), deleteRace);

router.post('/add-skill', check('name').notEmpty(), addSkill);
router.delete('/delete-skill', check('name').notEmpty(), deleteSkill);

router.post('/add-stat', check('name').notEmpty(), addStat);
router.delete('/delete-stat', check('name').notEmpty(), deleteStat);

router.post('/add-school', check('name').notEmpty(), addSchool);
router.delete('/delete-school', check('name').notEmpty(), deleteSchool);

router.post(
  '/add-spell',
  check('name').notEmpty(),
  check('cost').isNumeric(),
  check('schoolId').notEmpty(),
  check('description').notEmpty(),
  check('summary').notEmpty(),
  check('powerLevel').isNumeric(),
  addSpell,
);
router.delete('/delete-spell', check('name').notEmpty(), deleteSpell);

export default router;

/**
 * @swagger
 * /characterdata/add-class:
 *  post:
 *    description: "Creates new class"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Class"
 *      description: "Creates new class"
 *      schema:
 *        $ref: '#/definitions/class'
 *    responses:
 *      '201':
 *        description: New Class Created.
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: Internal server error.
 *
 * /characterdata/delete-class:
 *  delete:
 *    description: "Deletes selected class"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a class"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "Class deleted"
 *      '400':
 *        description: "Class not found"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/add-nature:
 *  post:
 *    description: "Creates new nature"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Nature"
 *      description: "Creates new nature"
 *      schema:
 *        $ref: '#/definitions/nature'
 *    responses:
 *      '201':
 *        description: New nature Created.
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: Internal server error.
 *
 * /characterdata/delete-nature:
 *  delete:
 *    description: "Deletes selected nature"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a nature"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "Nature deleted"
 *      '400':
 *        description: "Nature not found"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/add-race:
 *  post:
 *    description: "Creates new race"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Race"
 *      description: "Creates new race"
 *      schema:
 *        $ref: '#/definitions/race'
 *    responses:
 *      '201':
 *        description: New race Created.
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: Internal server error.
 *
 * /characterdata/delete-race:
 *  delete:
 *    description: "Deletes selected race"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a race"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "Race deleted"
 *      '400':
 *        description: "Race not found"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/add-skill:
 *  post:
 *    description: "Creates new skill"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Skill"
 *      description: "Creates new Skill"
 *      schema:
 *        $ref: '#/definitions/skill'
 *    responses:
 *      '201':
 *        description: New skill Created.
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: Internal server error.
 *
 * /characterdata/delete-skill:
 *  delete:
 *    description: "Deletes selected skill"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a skill"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "Skill deleted"
 *      '400':
 *        description: "Skill not found"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/add-stat:
 *  post:
 *    description: "Creates new stat"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Stat"
 *      description: "Creates new stat"
 *      schema:
 *        $ref: '#/definitions/stat'
 *    responses:
 *      '201':
 *        description: New stat Created.
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: Internal server error.
 *
 * /characterdata/delete-stat:
 *  delete:
 *    description: "Deletes selected stat"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a stat"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "Stat deleted"
 *      '400':
 *        description: "Stat not found"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/add-school:
 *  post:
 *    description: "Create new school of magic"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "School"
 *      description: "Create new school"
 *      schema:
 *        $ref: '#/definitions/school'
 *    responses:
 *      '201':
 *        description: "New school created"
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/delete-school:
 *  delete:
 *    description: "Deletes selected school"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a school"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "School deleted"
 *      '400':
 *        description: "School not found"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/add-spell:
 *  post:
 *    description: "Create new spell. Valid schoolId must be provided"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Create new spell"
 *      schema:
 *        $ref: '#/definitions/spell'
 *    responses:
 *      '201':
 *        description: "New spell created"
 *      '406':
 *        description: "Invalid inputs"
 *      '500':
 *        description: "Internal server error"
 *
 * /characterdata/delete-spell:
 *  delete:
 *    description: "Deletes selected spell"
 *    produces: "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "Spell"
 *      description: "Deletes a spell"
 *      schema:
 *        $ref: '#/definitions/delete'
 *    responses:
 *      '200':
 *        description: "Spell deleted"
 *      '400':
 *        description: "Spell not found"
 *      '500':
 *        description: "Internal server error"
 *
 * definitions:
 *  class:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      modifiers:
 *        type: array
 *        items:
 *          type: string
 *  race:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      modifiers:
 *        type: array
 *        items:
 *          type: string
 *      description:
 *          type: string
 *      specialRules:
 *          type: string
 *      psychologicalTraits:
 *          type: string
 *
 *  nature:
 *   type: object
 *   properties:
 *     name:
 *       type: string
 *
 *  skill:
 *   type: object
 *   properties:
 *     name:
 *       type: string
 *
 *  stat:
 *   type: object
 *   properties:
 *     name:
 *       type: string
 *
 *  school:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *
 *  spell:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      cost:
 *        type: integer
 *        format: int32
 *      powerLevel:
 *        type: integer
 *        format: int32
 *      schoolId:
 *        type: string
 *      description:
 *        type: string
 *      summary:
 *        type: string
 *
 *  delete:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        required: true
 */
