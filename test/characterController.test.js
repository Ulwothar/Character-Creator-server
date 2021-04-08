import { assert } from 'chai';
import { response } from 'express';
import request from 'supertest';
import app from '../app';

let characterCode; // Variable used to save characterCode with post test
// to enable us to delete the character during the delete endpoint test

const DUMMY_NEW_CHARACTER = {
  name: 'dummyName',
  race: 'Human',
  _class: 'Warrior',
  nature: 'Lawful',
  skills: [],
  stats: [{ strength: 5 }],
  weight: 95,
  height: 180,
  description: 'Some dummy description',
  spellsId: [],
};

const DUMMY_WRONG_CHARACTER = {
  race: 'Human',
  _class: 'Warrior',
  nature: 'Lawful',
  skills: [],
  stats: [],
  weight: 95,
  height: 180,
  description: 'Some dummy description',
  spellsId: [],
};

let DUMMY_UPDATED_CHARACTER = {
  name: 'dummyName',
  race: 'Elf',
  _class: 'Rogue',
  characterCode,
  level: 3,
  nature: 'Lawful',
  skills: [],
  stats: [{ strength: 5 }],
  weight: 95,
  height: 180,
  description: 'Another dummy description',
  spellsId: [],
};

const characterCode2 = 'asd';

const deleteError = 'Character code is invalid, this character does not exist!';

const assertCheck = (character, option) => {
  switch (option) {
    case 'AddCharacter':
      assert(character.name === DUMMY_NEW_CHARACTER.name);
      assert(character.race === DUMMY_NEW_CHARACTER.race);
      assert(character._class === DUMMY_NEW_CHARACTER.class);
      assert(character.level === 1);
      assert(character.characterCode === characterCode);
      assert(character.nature === DUMMY_NEW_CHARACTER.nature);
      assert(character.weight === DUMMY_NEW_CHARACTER.weight);
      assert(character.height === DUMMY_NEW_CHARACTER.height);
      assert(
        character.stats[0].strength == DUMMY_NEW_CHARACTER.stats[0].strength,
      );
      assert(character.skills[0] == DUMMY_NEW_CHARACTER.skills[0]);
      break;

    case 'UpdateCharacter':
      assert(character.name === DUMMY_UPDATED_CHARACTER.name);
      assert(character.race === DUMMY_UPDATED_CHARACTER.race);
      assert(character._class === DUMMY_UPDATED_CHARACTER._class);
      assert(character.level === DUMMY_UPDATED_CHARACTER.level);
      assert(character.characterCode === characterCode);
      assert(character.nature === DUMMY_UPDATED_CHARACTER.nature);
      assert(character.weight === DUMMY_UPDATED_CHARACTER.weight);
      assert(character.height === DUMMY_UPDATED_CHARACTER.height);
      assert(
        character.stats[0].strength ==
          DUMMY_UPDATED_CHARACTER.stats[0].strength,
      );
      assert(character.skills[0] == DUMMY_UPDATED_CHARACTER.skills[0]);
      break;

    case 'GetCharacter':
      assert(character.name === DUMMY_NEW_CHARACTER.name);
      assert(character.race === DUMMY_NEW_CHARACTER.race);
      assert(character._class === DUMMY_NEW_CHARACTER._class);
      assert(character.level === 1);
      assert(character.characterCode === characterCode);
      assert(character.nature === DUMMY_NEW_CHARACTER.nature);
      assert(character.weight === DUMMY_NEW_CHARACTER.weight);
      assert(character.height === DUMMY_NEW_CHARACTER.height);
      assert(
        character.stats[0].strength == DUMMY_NEW_CHARACTER.stats[0].strength,
      );
      assert(character.skills[0] == DUMMY_NEW_CHARACTER.skills[0]);
      break;
    default:
      return;
  }
};

let assertionSwitch;

describe('Character endpoints test', function () {
  it('Adding new character', function (done) {
    request(app)
      .post('/character/')
      .send(DUMMY_NEW_CHARACTER)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(function (response) {
        characterCode = response.body.character.characterCode;
        DUMMY_UPDATED_CHARACTER.characterCode = characterCode;
        assertionSwitch = 'AddCharacter';
        assertCheck(response.body.character, assertionSwitch);
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
      .get(`/character/${characterCode}`)
      .expect(200)
      .expect((response) => {
        let character = response.body.character[0];
        assertionSwitch = 'GetCharacter';
        assertCheck(character, assertionSwitch);
        done();
      })
      .catch((error) => done(error));
  });

  it('Getting character with wrong code', (done) => {
    request(app)
      .get(`/character/${characterCode2}`)
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
      .send(DUMMY_UPDATED_CHARACTER)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assertionSwitch = 'UpdateCharacter';
        const character = response.body.character;
        assertCheck(character, assertionSwitch);
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
