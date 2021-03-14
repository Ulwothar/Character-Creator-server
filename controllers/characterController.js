import { validationResult } from 'express-validator';

import Character from '../models/characterModel';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getCharacterInfo = (character) => {
  let getCharacterInfo = {};

  try {
    character.map((property) => {
      getCharacterInfo.name = property.characterName;
      getCharacterInfo.race = property.characterRace;
      getCharacterInfo.class = property.characterClass;
      getCharacterInfo.level = property.characterLevel;
      getCharacterInfo.characterCode = property.characterCode;
      getCharacterInfo.character = property.character;
      getCharacterInfo.stats = property.characterStats;
      getCharacterInfo.skills = property.characterSkills;
    });
  } catch (error) {
    console.log('adding new character');
    getCharacterInfo.name = character.characterName;
    getCharacterInfo.race = character.characterRace;
    getCharacterInfo.class = character.characterClass;
    getCharacterInfo.level = character.characterLevel;
    getCharacterInfo.characterCode = character.characterCode;
    getCharacterInfo.character = character.character;
    getCharacterInfo.stats = character.characterStats;
    getCharacterInfo.skills = character.characterSkills;
  }

  return getCharacterInfo;
};

export const addCharacter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { param } = errors.errors.find((value) => value.param);
    console.log(param);
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${param} field.`,
      }),
    );
  }

  const {
    characterName,
    characterClass,
    characterRace,
    character,
    characterSkills,
    characterStats,
  } = req.body;

  const characterLevel = 1;

  const name = characterName.slice(0, 4);
  const code = getRandomInt(10000, 100000);
  const characterCode = name + code;

  const newCharacter = new Character({
    characterName,
    characterRace,
    characterClass,
    characterCode,
    characterLevel,
    character,
    characterSkills,
    characterStats,
  });

  try {
    await newCharacter.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        'Internal server error. Could not create this character. Please try again.',
    });
  }

  res.status(201).json({
    message: 'Character created successfuly!',
    character: getCharacterInfo(newCharacter),
  });
};

export const getCharacter = async (req, res, next) => {
  const characterCode = req.params.cc;

  let newCharacter;

  try {
    newCharacter = await Character.find({ characterCode: characterCode });
  } catch (error) {
    return res.status(500).json({ message: 'Server error, please try again.' });
  }

  if (newCharacter.length === 0) {
    return next(
      res.status(404).json({
        error: `Character code is invalid, please make sure the code is typed properly.`,
      }),
    );
  }

  res.status(200).json({ character: getCharacterInfo(newCharacter) });
};

export const deleteCharacter = async (req, res, next) => {
  const characterCode = req.params.cc;

  try {
    await Character.deleteOne({ characterCode: characterCode });
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, could not delete this character.' }),
    );
  }

  res.status(200).json({ message: 'Character deleted successfully' });
};
