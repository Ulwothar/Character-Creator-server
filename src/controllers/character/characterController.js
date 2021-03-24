import { validationResult } from 'express-validator';

import Character from '../../models/character/characterModel';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getCharacterInfo = (character) => {
  let getCharacterInfo = {};

  try {
    character.map((property) => {
      getCharacterInfo.name = property.name;
      getCharacterInfo.race = property.race;
      getCharacterInfo.class = property._class;
      getCharacterInfo.level = property.level;
      getCharacterInfo.characterCode = property.characterCode;
      getCharacterInfo.character = property.character;
      getCharacterInfo.stats = property.characterStats;
      getCharacterInfo.skills = property.characterSkills;
    });
  } catch (error) {
    console.log('adding new character');
    getCharacterInfo.name = character.cname;
    getCharacterInfo.race = character.race;
    getCharacterInfo.class = character._class;
    getCharacterInfo.level = character.level;
    getCharacterInfo.characterCode = character.characterCode;
    getCharacterInfo.character = character.character;
    getCharacterInfo.stats = character.stats;
    getCharacterInfo.skills = character.skills;
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

  const { name, _class, race, nature, skills, stats } = req.body;

  console.log(name);

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
    name,
    _class,
    race,
    nature,
    skills,
    stats,
    level,
    characterCode,
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