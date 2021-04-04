import { assert } from 'chai';
import request from 'supertest';
import app from '../app';

const DUMMY_NEW_CHARACTER = {
  name: 'dummyName',
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

// const DUMMY_UPDATED_CHARACTER = {
//   name: 'dummyName',
//   race: 'Human',
//   _class: 'Warrior',
//   characterCode,
//   level,
//   nature,
//   skills,
//   stats,
//   weight,
//   height,
//   description,
//   spellsId,
// };

let characterCode; // Variable used to save characterCode with post test
// to enable us to delete the character during the delete endpoint test

const url = 'http://loccalhost:4000/character/';

describe('Character endpoints test', function () {
  it('Adding new character', function (done) {
    request(app)
      .post('/character/')
      .send(DUMMY_NEW_CHARACTER)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        assert(response.body.character.name, DUMMY_NEW_CHARACTER.name);
        assert(response.body.character.race, DUMMY_NEW_CHARACTER.race);
        assert(response.body.character.class, DUMMY_NEW_CHARACTER.class);
        assert(response.body.character.level, 1);
        assert(response.body.character.characterCode, !null);
        assert(response.body.character.nature, DUMMY_NEW_CHARACTER.nature);
        assert(response.body.character.weight, DUMMY_NEW_CHARACTER.weight);
        assert(response.body.character.height, DUMMY_NEW_CHARACTER.height);
        assert(response.body.character.stats, DUMMY_NEW_CHARACTER.stats);
        assert(response.body.character.skills, DUMMY_NEW_CHARACTER.skills);
        characterCode = response.body.character.characterCode;
        console.log(response.body.character);
        console.log({ characterCode: characterCode });
        done();
      })
      .catch((error) => done(error));
  });

  it('Deleting character', function (done) {
    request(app)
      .delete(`/character/${characterCode}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(done())
      .catch((error) => done(error));
  });
});
