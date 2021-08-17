import { validationResult } from 'express-validator';

import Character from '../../models/character/characterModel';
import ValidateData, { ValidateResource } from '../../shared/dataValidator';
import switchToUpperCase from '../../shared/switchToUpperCase';

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
  getCharacterInfo.alignment = character.alignment;
  getCharacterInfo.weight = character.weight;
  getCharacterInfo.height = character.height;
  getCharacterInfo.stats = character.stats;
  getCharacterInfo.skills = character.skills;
  getCharacterInfo.image = character.image;
  getCharacterInfo.gender = character.gender;
  getCharacterInfo.description = character.description;

  return getCharacterInfo;
};

const extractCharacterInfo = (character) => {
  let getCharacterInfo = {};

  console.log('loading character');
  getCharacterInfo.name = character[0].name;
  getCharacterInfo.race = character[0].race;
  getCharacterInfo._class = character[0]._class;
  getCharacterInfo.level = character[0].level;
  getCharacterInfo.characterCode = character[0].characterCode;
  getCharacterInfo.alignment = character[0].alignment;
  getCharacterInfo.weight = character[0].weight;
  getCharacterInfo.height = character[0].height;
  getCharacterInfo.stats = character[0].stats;
  getCharacterInfo.skills = character[0].skills;
  getCharacterInfo.image = character[0].image;
  getCharacterInfo.gender = character[0].gender;
  getCharacterInfo.description = character[0].description;

  return getCharacterInfo;
};

export const addCharacter = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(400).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  // let checkResource = null;
  let resourceChecked;
  const checkResource = () => {
    Object.entries(req.body).forEach(async ([key, value]) => {
      let databaseValidationResult = await ValidateResource(key, value);
      if (databaseValidationResult !== null) {
        resourceChecked = databaseValidationResult;
      }
    });
  };
  try {
    await checkResource();
    if (resourceChecked) {
      return res.status(406).json({ resourceChecked });
    }
  } catch (error) {
    return res.status(406).json({ error: error });
  }

  console.log(resourceChecked);
  setTimeout(() => {
    console.log(resourceChecked);
  }, 5000);

  const {
    name,
    _class,
    race,
    alignment,
    gender,
    spellsId,
    weight,
    height,
    description,
  } = req.body;

  let image;

  if (req.body.image) {
    image = req.body.image;
  } else if (req.body.onlineImage) {
    image = req.body.onlineImage;
  }

  const stats = req.body.stats.split(',');
  const skills = req.body.skills.split(',');

  const level = 1;

  // let someImage = image;

  const cName = name.slice(0, 4);
  const code = getRandomInt(10000, 100000);
  const characterCode = cName + code;

  const newCharacter = new Character({
    name,
    race,
    _class,
    characterCode,
    level,
    alignment,
    gender,
    skills,
    stats,
    weight,
    height,
    description,
    spellsId,
    image,
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
      res.status(400).send({
        error: `Character code is invalid, please make sure the code is typed properly.`,
      }),
    );
  }

  // console.log(
  //   newCharacter.map((character) => character.toObject({ getters: true })),
  // );

  // res.status(200).send({
  //   character: newCharacter.map((character) =>
  //     character.toObject({ getters: true }),
  //   ),
  // });

  let character = extractCharacterInfo(newCharacter);
  res.status(200).send({ character: character });
};

export const deleteCharacter = async (req, res, next) => {
  const characterCode = req.params.cc;

  try {
    let characterCheck = await Character.findOne({
      characterCode: characterCode,
    });
    if (!characterCheck) {
      return res.status(400).json({
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
      res.status(400).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const {
    name,
    _class,
    race,
    alignment,
    skills,
    stats,
    level,
    characterCode,
    spellsId,
    weight,
    height,
    description,
  } = req.body;

  let image;

  if (req.body.image) {
    image = req.body.image;
  } else if (req.body.onlineImage) {
    image = req.body.onlineImage;
  }

  let updateCharacter;
  const filter = { characterCode: characterCode };
  const update = {
    name: name,
    _class: _class,
    race: race,
    alignment: alignment,
    skills: skills,
    stats: stats,
    level: level,
    weight: weight,
    height: height,
    description: description,
    spellsId: spellsId,
    image: image,
  };

  try {
    let characterCheck = await Character.find({ characterCode: characterCode });
    if (characterCheck.length === 0) {
      return next(
        res.status(400).json({
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
      res.status(400).json({
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
        res.status(400).json({
          error: 'Could not find this character, please check your data',
        }),
      );
    }
  } catch (error) {
    return next(
      res.status(500).json({ error: 'Server error, please try again.' }),
    );
  }

  res.status(201).json({ message: 'Level up!' });
};

export const getCharactersBy = async (req, res, next) => {
  let queryParams = req.query;
  let characters = [];
  let dbQuery;
  let myQuery = {};
  const queryLength = Object.keys(req.query).length;

  // Iterate through query params and change every first letter to uppercase (that's how we store it in database)
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'aggregate' && key !== 'groupCharacters' && key !== 'level') {
      // value = value.charAt(0).toUpperCase() + value.slice(1);
      value = switchToUpperCase(value);
      myQuery[key] = value;
    }
    if (key === 'level') {
      myQuery[key] = parseInt(value);
    }
  });
  const { aggregate, all } = req.query;
  const { race, _class, level, alignment, characterCode } = myQuery;
  let characterCodeLength = 0;
  if (characterCode) {
    if (characterCode.length > 0) {
      characterCodeLength = characterCode.length;
    }
  }
  console.log(characterCodeLength);
  if (characterCode && characterCodeLength > 1) {
    try {
      characters = await Character.find({ characterCode: characterCode });
      if (characters.length === 0) {
        return res
          .status(404)
          .json({ error: 'Character with this code does not exist.' });
      }
    } catch (error) {
      return next(
        res.status(404).json({
          error: 'Character not found, please check your characterCode',
        }),
      );
    }
    return res.status(200).json({ character: characters });
  }

  if (queryLength === 0 || (characterCode && characterCodeLength === 0)) {
    return res
      .status(404)
      .json({ error: 'No data passed, please specify your query' });
  }

  // Find and return all characters with all params valid
  if (!aggregate && !all) {
    try {
      dbQuery = await Character.find(myQuery);
      if (dbQuery.length === 0) {
        return res
          .status(404)
          .json({ error: `There are no characters with selected parameters.` });
      }
    } catch (error) {
      return next(res.status(500).json({ error: error }));
    }
    return res.status(200).json({ characters: dbQuery, count: dbQuery.length });
  }

  if (all && !aggregate) {
    try {
      characters = await Character.find();
      if (characters.length === 0) {
        return res.status(404).json({ error: 'No characters found.' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Server error, please try again.' });
    }

    return res.status(200).json({ characters: characters });
  }

  //Returns aggregated set of data for all characters in database
  if (!race && !_class && !alignment && !level) {
    characters = await Character.aggregate([
      {
        $match: { level: { $gte: 0 } },
      },
      {
        $group: {
          _id: null,
          _class: { $addToSet: '$_class' },
          race: { $addToSet: '$race' },
          level: { $addToSet: '$level' },
          count: { $sum: 1 },
        },
      },
    ])
      .exec()
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return next(res.status(500).json({ error: 'Server error!' }));
        }
      });
    return res.status(200).json({ characters: characters });
  }

  //Returns aggregated set of data for characters with selected parameters
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
            $or: [
              alignment
                ? { alignment: alignment }
                : { alignment: { $ne: alignment } },
            ],
          },
          {
            $or: [level ? { level: level } : { level: { $ne: 0 } }],
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
        alignment: { $addToSet: '$alignment' },
        name: { $addToSet: '$name' },
        count: { $sum: 1 },
      },
    },
  ])
    .exec()
    .then((res) => {
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
