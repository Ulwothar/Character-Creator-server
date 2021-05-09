import { assert } from 'chai';
import { response } from 'express';
import request from 'supertest';
import app from '../app';

import {
  assertCheck,
  DUMMY_NEW_CHARACTER,
  DUMMY_UPDATED_CHARACTER as _UPDATED_CHARACTER,
  DUMMY_WRONG_CHARACTER,
} from './characterTestingData';

let DUMMY_UPDATED_CHARACTER = _UPDATED_CHARACTER;
let characterCode; // Variable used to save characterCode with post test
// to enable us to delete the character during the delete endpoint test

const characterCode2 = 'asd';
let assertionSwitch;

describe('Character endpoints test', function () {
  it('Adding new character', function (done) {
    request(app)
      .post('/character/')
      .set('Content-Type', 'multipart/form-data')
      .field('name', DUMMY_NEW_CHARACTER.name)
      .field('race', DUMMY_NEW_CHARACTER.race)
      .field('_class', DUMMY_NEW_CHARACTER._class)
      .field('nature', DUMMY_NEW_CHARACTER.nature)
      .field('gender', DUMMY_NEW_CHARACTER.gender)
      .field('stats', DUMMY_NEW_CHARACTER.stats)
      .field('skills', DUMMY_NEW_CHARACTER.skills)
      .field('height', DUMMY_NEW_CHARACTER.height)
      .field('weight', DUMMY_NEW_CHARACTER.weight)
      .field('description', DUMMY_NEW_CHARACTER.description)
      .field('spellsId', DUMMY_NEW_CHARACTER.spellsId)
      .expect(201)
      .then(function (response) {
        characterCode = response.body.character.characterCode;
        DUMMY_UPDATED_CHARACTER.characterCode = characterCode;
        assertionSwitch = 'AddCharacter';
        assertCheck(response.body.character, characterCode, assertionSwitch);
        done();
      })
      .catch((error) => done(error));
  });

  it('Adding faulty character', function (done) {
    request(app)
      .post('/character/')
      .send(DUMMY_WRONG_CHARACTER)
      .expect('Content-Type', /json/)
      .expect(406)
      .then((response) => {
        assert(
          response.body.error ===
            'Invalid inputs, please fill in the name field.',
        );
        done();
      })
      .catch((error) => done(error));
  });

  it('Getting character', (done) => {
    request(app)
      .get(`/character/specific/${characterCode}`)
      .expect(200)
      .expect((response) => {
        let character = response.body.character[0];
        assertionSwitch = 'GetCharacter';
        assertCheck(character, characterCode, assertionSwitch);
        done();
      })
      .catch((error) => done(error));
  });

  it('Getting character with wrong code', (done) => {
    request(app)
      .get(`/character/specific/${characterCode2}`)
      .expect(404)
      .then((response) => {
        assert(
          response.body.error ===
            'Character code is invalid, please make sure the code is typed properly.',
          'Wrong code check error',
        );
        done();
      })
      .catch((error) => done(error));
  });

  it('Updating character', (done) => {
    request(app)
      .patch('/character/')
      .set('Content-Type', 'multipart/form-data')
      .field('name', DUMMY_UPDATED_CHARACTER.name)
      .field('race', DUMMY_UPDATED_CHARACTER.race)
      .field('_class', DUMMY_UPDATED_CHARACTER._class)
      .field('nature', DUMMY_UPDATED_CHARACTER.nature)
      .field('gender', DUMMY_UPDATED_CHARACTER.gender)
      .field('stats', DUMMY_UPDATED_CHARACTER.stats)
      .field('skills', DUMMY_UPDATED_CHARACTER.skills)
      .field('height', DUMMY_UPDATED_CHARACTER.height)
      .field('weight', DUMMY_UPDATED_CHARACTER.weight)
      .field('description', DUMMY_UPDATED_CHARACTER.description)
      .field('spellsId', DUMMY_UPDATED_CHARACTER.spellsId)
      .field('characterCode', DUMMY_UPDATED_CHARACTER.characterCode)
      .field('level', DUMMY_UPDATED_CHARACTER.level)
      .expect(200)
      .then((response) => {
        assertionSwitch = 'UpdateCharacter';
        const character = response.body.character;
        assertCheck(character, characterCode, assertionSwitch);
        DUMMY_UPDATED_CHARACTER.characterCode = 'wrongCode';
        done();
      })
      .catch((error) => done(error));
  });

  it('Updating character with wrong data', (done) => {
    request(app)
      .patch('/character/')
      .send(DUMMY_UPDATED_CHARACTER)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('Changing level of existing character', (done) => {
    request(app)
      .patch('/character/level-up/')
      .send({ level: 10, characterCode: characterCode })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert(response.body.message === 'Level up!');
        done();
      })
      .catch((error) => done(error));
  });

  it('Changing level of non-existing character', (done) => {
    request(app)
      .patch('/character/level-up/')
      .send({ level: 10, characterCode: 'NonExistingCode' })
      .expect(404)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert(
          response.body.error ===
            'Could not find this character, please check your data',
        );
        done();
      })
      .catch((error) => done(error));
  });

  it('Changing level with incorrect data', (done) => {
    request(app)
      .patch('/character/level-up/')
      .send({ level: 'fifteen', characterCode: characterCode })
      .expect(406)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert(
          response.body.error ===
            'Invalid inputs, please fill in the level field.',
          'Incorrect level data',
        );
        done();
      })
      .catch((error) => done(error));
  });

  it('Getting list of all characters', (done) => {
    request(app)
      .get('/character/characterstats')
      .expect(200)
      .then((response) => {
        assert(response.body.characters.length > 0, 'No characters recieved');

        done();
      })
      .catch((error) => done(error));
  });

  it('Getting lists of characters grouped by different categories', (done) => {
    request(app)
      .get(
        '/character/characterstats/?level=1&race=Human&nature=Lawfull&_class=Warrior',
      )
      .expect(200)
      .then((response) => {
        assert(
          response.body.characters[0].byRace.length > 0,
          "Didn't get any human characters.",
        );
        assert(
          response.body.characters[1].byClass.length > 0,
          "Didn't get any warrior characters.",
        );
        assert(
          response.body.characters[2].byLevel.length > 0,
          "Didn't get any level 1 characters.",
        );
        assert(
          response.body.characters[3].byNature.length > 0,
          "Didn't get any lawfull characters.",
        );
        done();
      })
      .catch((error) => done(error));
  });

  it('Getting set of characters with passed criteria', (done) => {
    request(app)
      .get(
        '/character/characterstats/?level=1&race=Human&nature=Lawfull&_class=Warrior&aggregate=true',
      )
      .expect(200)
      .then((response) => {
        assert(response.body.characters[0].count >= 1, 'No characters found!');
        assert(response.body.characters[0]._id === null, 'Wrong ids recieved');
        done();
      })
      .catch((error) => done(error));
  });

  it('Deleting character', function (done) {
    request(app)
      .delete(`/character/${characterCode}`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Deleting character with wrong characterCode', function (done) {
    request(app)
      .delete(`/character/${characterCode2}`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        assert(
          response.body.error ===
            'Character code is invalid, this character does not exist!',
          'deleteError',
        );
        done();
      })
      .catch((error) => done(error));
  });
});
