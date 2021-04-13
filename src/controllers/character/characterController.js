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
  getCharacterInfo.weight = character.weight;
  getCharacterInfo.height = character.height;
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
    spellsId,
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
    spellsId,
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
    spellsId,
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
    spellsId: spellsId,
  };

  try {
    let characterCheck = await Character.find({ characterCode: characterCode });
    if (characterCheck.length === 0) {
      return next(
        res.status(404).json({
          error: 'Character does not exist, please check your character Code',
        }),
      );
    }
  } catch (error) {
    return next(
      res.status(500).json({ error: 'Server error, please try again' }),
    );
  }

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
        res.status(404).json({
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

export const getCharactersBy = async (req, res, next) => {
  let { race, _class, level, nature, aggregate } = req.query;

  let characters = [];
  let dbQuery;

  if (!race && !_class && !level && !nature) {
    try {
      characters = await Character.find();
    } catch (error) {
      return next(res.status(500).json({ characters: characters }));
    }
  }
  if (!aggregate) {
    if (race) {
      race = race.charAt(0).toUpperCase() + race.slice(1);
      try {
        dbQuery = await Character.find({ race: race });
        if (dbQuery.length === 0) {
          dbQuery = { error: `There are no characters with ${race} race.` };
        }
        characters.push({ byRace: dbQuery, count: dbQuery.length });
      } catch (error) {
        return next(res.status(500).json({ error: 'Server error.' }));
      }
    }

    if (_class) {
      _class = _class.charAt(0).toUpperCase() + _class.slice(1);
      try {
        dbQuery = await Character.find({ _class: _class });
        if (dbQuery.length === 0) {
          dbQuery = { error: `There are no characters with ${_class} class.` };
        }
        characters.push({ byClass: dbQuery, count: dbQuery.length });
      } catch (error) {
        return next(res.status(500).json({ error: 'Server error.' }));
      }
    }

    if (level) {
      try {
        dbQuery = await Character.find({ level: level });
        if (dbQuery.length === 0) {
          dbQuery = { error: `There are no characters with ${level} level.` };
        }
        characters.push({ byLevel: dbQuery, count: dbQuery.length });
      } catch (error) {
        return next(res.status(500).json({ error: 'Server error.' }));
      }
    }

    if (nature) {
      nature = nature.charAt(0).toUpperCase() + nature.slice(1);
      try {
        dbQuery = await Character.find({ nature: nature });
        if (dbQuery.length === 0) {
          dbQuery = { error: `There are no characters with ${nature} nature.` };
        }
        characters[characters.length] = {
          byNature: dbQuery,
          count: dbQuery.length,
        };
      } catch (error) {
        return next(res.status(500).json({ error: 'Server error.' }));
      }
    }

    return next(res.status(200).json({ characters: characters }));
  }
  level = parseInt(level);
  characters = await Character.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [race ? { race: race } : { race: { $ne: race } }],
          },
          {
            $or: [_class ? { _class: _class } : { _class: { $ne: _class } }],
          },
          {
            $or: [nature ? { nature: nature } : { nature: { $ne: nature } }],
          },
          {
            $or: [level ? { level: level } : { level: { $gt: 0 } }],
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        race: { $addToSet: '$race' },
        _class: { $addToSet: '$_class' },
        level: { $addToSet: '$level' },
        nature: { $addToSet: '$nature' },
        name: { $addToSet: '$name' },
        count: { $sum: 1 },
      },
    },
  ])
    .exec()
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return next(res.status(500).json({ error: 'Server error.' }));
    });

  if (characters.length === 0) {
    return next(
      res
        .status(404)
        .json({ message: 'There are no characters with specified criteria.' }),
    );
  }
  return res.status(200).json({ characters: characters });
};

//Currently unavailable due to other changes. We don't know if this section will be deleted or patched yet.
// export const addSchool = async (req, res, next) => {
//   const errors = validationResult(req);

//   const dataError = ValidateData(errors);

//   if (dataError) {
//     return next(
//       res.status(406).json({
//         error: `Invalid inputs, please fill in the ${dataError} field.`,
//       }),
//     );
//   }

//   const { name, schoolId, characterCode } = req.body;

//   const filter = { characterCode: characterCode };

//   try {
//     const updatedCharacter = await Character.findOneAndUpdate(
//       filter,
//       { $push: { schools: { name: name, schoolId: schoolId } } },
//       { new: true, useFindAndModify: false },
//     );
//     console.log(updatedCharacter);
//     res
//       .status(201)
//       .json({ message: 'New school added.', character: updatedCharacter });
//   } catch (error) {
//     console.log(error);
//     return next(res.status(500).json({ error: 'Server error' }));
//   }
// };
