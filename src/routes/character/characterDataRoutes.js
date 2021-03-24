import express from 'express';
import { check } from 'express-validator';
import {
  addNature,
  addRace,
  addSkill,
  addStat,
  add_Class,
} from '../../controllers/characterData/characterDataController';

const router = express.Router();

router.post('/add-class', check('name').notEmpty(), add_Class);

router.post('/add-nature', check('name').notEmpty(), addNature);

router.post('/add-race', check('name').notEmpty(), addRace);

router.post('/add-skill', check('name').notEmpty(), addSkill);

router.post('/add-stat', check('name').notEmpty(), addStat);

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
 *      '500':
 *        description: Internal server error.
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
 *      '500':
 *        description: Internal server error.
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
 *      '500':
 *        description: Internal server error.
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
 *      '500':
 *        description: Internal server error.
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
 *      '500':
 *        description: Internal server error.
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
 */
