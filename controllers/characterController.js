import { validationResult } from 'express-validator';

import Character from '../models/characterModel';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

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
