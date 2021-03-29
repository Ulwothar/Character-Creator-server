import { validationResult } from 'express-validator';

import _Class from '../../models/_classes/_classModel';
import Nature from '../../models/natures/natureModel';
import Race from '../../models/races/raceModel';
import Skill from '../../models/skills/skillModel';
import Stat from '../../models/stats/statModel';
import School from '../../models/spells/schoolModel';
import Spell from '../../models/spells/spellModel';
import ValidateData from '../../shared/dataValidator';

export const add_Class = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { name, modifiers } = req.body;

  const newClass = new _Class({
    name,
    modifiers,
  });

  try {
    await newClass.save();
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, please try again.' })
        .error(error),
    );
  }

  res.status(201).json({ class: newClass });
};

export const addNature = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { name, modifiers } = req.body;

  const newNature = new Nature({
    name,
    modifiers,
  });

  try {
    await newNature.save();
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, please try again.' })
        .error(error),
    );
  }

  res.status(201).json({ nature: newNature });
};

export const addRace = async (req, res, next) => {
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
    modifiers,
    description,
    specialRules,
    psychologicalTraits,
  } = req.body;

  const newRace = new Race({
    name,
    modifiers,
    description,
    specialRules,
    psychologicalTraits,
  });

  try {
    await newRace.save();
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, please try again.' })
        .error(error),
    );
  }

  res.status(201).json({ race: newRace });
};

export const addSkill = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { name, modifiers } = req.body;

  const newSkill = new Skill({
    name,
    modifiers,
  });

  try {
    await newSkill.save();
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, please try again.' })
        .error(error),
    );
  }

  res.status(201).json({ skill: newSkill });
};

export const addStat = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { name, modifiers } = req.body;

  const newStat = new Stat({
    name,
    modifiers,
  });

  try {
    await newStat.save();
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, please try again.' })
        .error(error),
    );
  }

  res.status(201).json({ stat: newStat });
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

  const { name } = req.body;

  const newSchool = new School({
    name,
  });

  try {
    await newSchool.save();
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ error: 'Server error, please try again.' })
        .error(error),
    );
  }

  res.status(201).json({ school: newSchool });
};

export const addSpell = async (req, res, next) => {
  const errors = validationResult(req);

  const dataError = ValidateData(errors);

  if (dataError) {
    return next(
      res.status(406).json({
        error: `Invalid inputs, please fill in the ${dataError} field.`,
      }),
    );
  }

  const { name, cost, schoolId, description, summary, powerLevel } = req.body;
  console.log('before checking school');
  try {
    const checkId = await School.find({ _id: schoolId });
    console.log(checkId);
    if (!checkId) {
      return next(
        res.status(406).json({ error: 'School with this Id does not exist' }),
      );
    }
  } catch (error) {
    return next(
      res
        .status(406)
        .json({ message: 'Server error, could not find this school' }),
    );
  }

  console.log('after checking school');

  const newSpell = new Spell({
    name,
    cost,
    powerLevel,
    schoolId,
    description,
    summary,
  });

  try {
    await newSpell.save();
    console.log('creating new spell');
  } catch (error) {
    console.log('creating spell failed');
    return next(
      res
        .status(500)
        .json({ message: 'Server error, could not add this spell' }),
    );
  }

  console.log({ message: 'spell created', spell: newSpell });
  res
    .status(201)
    .json({ message: 'Spell created successfully', spell: newSpell });
};

export const characterFormData = async (req, res, next) => {
  let new_Class, newNature, newRace, newSkill, newStat, newSchool, newSpell;
  try {
    new_Class = await _Class.find({});
    newNature = await Nature.find({});
    newRace = await Race.find({});
    newSkill = await Skill.find({});
    newStat = await Stat.find({});
    newSchool = await School.find({});
    newSpell = await Spell.find({});
  } catch (error) {
    console.log(error);
    return next(
      res.status(500).json({ error: 'Server error, please try again.' }),
    );
  }

  res.status(200).json({
    classes: new_Class,
    natures: newNature,
    races: newRace,
    skills: newSkill,
    stats: newStat,
    schools: newSchool,
    spells: newSpell,
  });
};
