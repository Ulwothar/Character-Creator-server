import { validationResult } from 'express-validator';

import Character from '../../models/character/characterModel';
import ValidateData from '../../shared/dataValidator';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getCharacterInfo = (character) => {
  let getCharacterInfo = {};

  console.log('adding new character');
  getCharacterInfo.name = character.name;
  getCharacterInfo.race = character.race;
  getCharacterInfo.class = character._class;
  getCharacterInfo.level = character.level;
  getCharacterInfo.characterCode = character.characterCode;
  getCharacterInfo.nature = character.nature;
  getCharacterInfo.stats = character.stats;
  getCharacterInfo.skills = character.skills;
  getCharacterInfo.schools = character.schools;

  return getCharacterInfo;
};

export const addCharacter = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const {
    name,
    _class,
    race,
    nature,
    skills,
    stats,
    schools,
    weight,
    height,
    description,
  } = req.body;

  const level = 1;

  const cName = name.slice(0, 4);
  const code = getRandomInt(10000, 100000);
  const characterCode = cName + code;

  const newCharacter = new Character({
    name,
    race,
    _class,
    characterCode,
    level,
    nature,
    skills,
    stats,
    weight,
    height,
    description,
    schools,
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

  console.log(
    newCharacter.map((character) => character.toObject({ getters: true })),
  );

  res.status(200).json({
    character: newCharacter.map((character) =>
      character.toObject({ getters: true }),
    ),
  });
};

export const deleteCharacter = async (req, res, next) => {
  const characterCode = req.params.cc;

  try {
    let characterCheck = await Character.findOne({
      characterCode: characterCode,
    });
    if (!characterCheck) {
      return res.status(404).json({
        error: 'Character code is invalid, this character does not exist!',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error, please try again.' });
  }

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

export const updateCharacter = async (req, res, next) => {
  const errors = validationResult(req);
  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const {
    name,
    _class,
    race,
    nature,
    skills,
    stats,
    level,
    characterCode,
    schools,
    weight,
    height,
    description,
  } = req.body;

  let updateCharacter;
  const filter = { characterCode: characterCode };
  const update = {
    name: name,
    _class: _class,
    race: race,
    nature: nature,
    skills: skills,
    stats: stats,
    level: level,
    weight: weight,
    height: height,
    description: description,
    schools: schools,
  };

  try {
    updateCharacter = await Character.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
    return next(
      res.status(500).json({ error: 'Server error, please try again.' }),
    );
  }

  res.status(200).json({
    message: 'Character updated successfully!',
    character: updateCharacter,
  });
};

export const levelUp = async (req, res, next) => {
  const errors = validationResult(req);
  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { characterCode, level } = req.body;

  const filter = { characterCode: characterCode };

  const update = { level: level };

  let character;
  try {
    character = await Character.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: false,
    });
    if (!character) {
      return next(
        res.status(406).json({
          error: 'Could not find this character, please check your data',
        }),
      );
    }
    console.log(character);
  } catch (error) {
    return next(
      res.status(500).json({ error: 'Server error, please try again.' }),
    );
  }

  res.status(201).json({ message: 'Level up!' });
};

export const addSchool = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { name, schoolId, characterCode } = req.body;

  const filter = { characterCode: characterCode };

  try {
    const updatedCharacter = await Character.findOneAndUpdate(
      filter,
      { $push: { schools: { name: name, schoolId: schoolId } } },
      { new: true, useFindAndModify: false },
    );
    console.log(updatedCharacter);
    res
      .status(201)
      .json({ message: 'New school added.', character: updatedCharacter });
  } catch (error) {
    console.log(error);
    return next(res.status(500).json({ error: 'Server error' }));
  }
};
