import { validationResult } from 'express-validator';

import _Class from '../../models/_classes/_classModel';
import Nature from '../../models/natures/natureModel';
import Race from '../../models/races/raceModel';
import Skill from '../../models/skills/skillModel';
import Stat from '../../models/stats/statModel';

export const add_Class = async (req, res, next) => {
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
  const { name, modifiers } = req.body;

  const newRace = new Race({
    name,
    modifiers,
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

export const characterFormData = async (req, res, next) => {
  let new_Class, newNature, newRace, newSkill, newStat;
  try {
    new_Class = await _Class.find({});
    newNature = await Nature.find({});
    newRace = await Race.find({});
    newSkill = await Skill.find({});
    newStat = await Stat.find({});
  } catch (error) {
    console.log(error);
    return next(
      res.status(500).json({ error: 'Server error, please try again.' }),
    );
  }

  console.log(newRace);
  res.status(200).json({
    classes: new_Class,
    natures: newNature,
    races: newRace,
    skills: newSkill,
    stats: newStat,
  });
};
