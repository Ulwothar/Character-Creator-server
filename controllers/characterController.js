import { validationResult } from 'express-validator';

import Character from '../models/characterModel';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getCharacterInfo = (character) => {
  let getCharacterInfo = {};
  character.map((property) => {
    getCharacterInfo.chcaracterName = property.characterName;
    getCharacterInfo.characterRace = property.characterRace;
    getCharacterInfo.characterClass = property.characterClass;
    getCharacterInfo.characterLevel = property.characterLevel;
    getCharacterInfo.characterCode = property.characterCode;
  });

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

  const { characterName, characterClass, characterRace } = req.body;

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

  res
    .status(201)
    .json({ message: 'Character created successfuly!', newCharacter });
};

export const getCharacter = async (req, res, next) => {
  const characterCode = req.params.cc;

  let character;

  try {
    character = await Character.find({ characterCode: characterCode });
  } catch (error) {
    return res.status(500).json({ message: 'Server error, please try again.' });
  }

  if (character.length === 0) {
    return res.status(404).json({
      error: `Character code ${characterCode} does not exists, please check your spelling.`,
    });
  }

  res.status(200).json({ character: getCharacterInfo(character) });
};
