import { assert } from 'chai';

export const DUMMY_NEW_CHARACTER = {
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

export const DUMMY_WRONG_CHARACTER = {
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

export const DUMMY_UPDATED_CHARACTER = {
  name: 'dummyName',
  race: 'Elf',
  _class: 'Rogue',
  characterCode: '',
  level: 3,
  nature: 'Lawful',
  skills: [],
  stats: [{ strength: 5 }],
  weight: 95,
  height: 180,
  description: 'Another dummy description',
  spellsId: [],
};

export const assertCheck = (character, characterCode, option) => {
  switch (option) {
    case 'AddCharacter':
      assert(
        character.name === DUMMY_NEW_CHARACTER.name,
        'Wrong character name',
      );
      assert(
        character.race === DUMMY_NEW_CHARACTER.race,
        'Wrong character race',
      );
      assert(
        character._class === DUMMY_NEW_CHARACTER.class,
        'Wrong character class',
      );
      assert(character.level === 1), 'Wrong character level';
      assert(character.characterCode === characterCode, 'Wrong character code');
      assert(
        character.nature === DUMMY_NEW_CHARACTER.nature,
        'Wrong character nature',
      );
      assert(
        character.weight === DUMMY_NEW_CHARACTER.weight,
        'Wrong character weight',
      );
      assert(
        character.height === DUMMY_NEW_CHARACTER.height,
        'Wrong character height',
      );
      assert(
        character.stats[0].strength == DUMMY_NEW_CHARACTER.stats[0].strength,
        'Wrong character stats',
      );
      assert(
        character.skills[0] == DUMMY_NEW_CHARACTER.skills[0],
        'Wrong character skills',
      );
      break;

    case 'UpdateCharacter':
      assert(
        character.name === DUMMY_UPDATED_CHARACTER.name,
        'Wrong character name',
      );
      assert(
        character.race === DUMMY_UPDATED_CHARACTER.race,
        'Wrong character race',
      );
      assert(
        character._class === DUMMY_UPDATED_CHARACTER._class,
        'Wrong character class',
      );
      assert(
        character.level === DUMMY_UPDATED_CHARACTER.level,
        'Wrong character level',
      );
      assert(character.characterCode === characterCode, 'Wrong character code');
      assert(
        character.nature === DUMMY_UPDATED_CHARACTER.nature,
        'Wrong character nature',
      );
      assert(
        character.weight === DUMMY_UPDATED_CHARACTER.weight,
        'Wrong character weight',
      );
      assert(
        character.height === DUMMY_UPDATED_CHARACTER.height,
        'Wrong character height',
      );
      assert(
        character.stats[0].strength ==
          DUMMY_UPDATED_CHARACTER.stats[0].strength,
        'Wrong character stats',
      );
      assert(
        character.skills[0] == DUMMY_UPDATED_CHARACTER.skills[0],
        'Wrong character skills',
      );
      break;

    case 'GetCharacter':
      assert(
        character.name === DUMMY_NEW_CHARACTER.name,
        'Wrong character name',
      );
      assert(
        character.race === DUMMY_NEW_CHARACTER.race,
        'Wrong character race',
      );
      assert(
        character._class === DUMMY_NEW_CHARACTER._class,
        'Wrong character class',
      );
      assert(character.level === 1, 'Wrong character level');
      assert(character.characterCode === characterCode, 'Wrong character code');
      assert(
        character.nature === DUMMY_NEW_CHARACTER.nature,
        'Wrong character nature',
      );
      assert(
        character.weight === DUMMY_NEW_CHARACTER.weight,
        'Wrong character weight',
      );
      assert(
        character.height === DUMMY_NEW_CHARACTER.height,
        'Wrong character height',
      );
      assert(
        character.stats[0].strength == DUMMY_NEW_CHARACTER.stats[0].strength,
        'Wrong character stats',
      );
      assert(
        character.skills[0] == DUMMY_NEW_CHARACTER.skills[0],
        'Wrong character skills',
      );
      break;
    default:
      return;
  }
};
