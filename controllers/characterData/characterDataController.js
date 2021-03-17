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
