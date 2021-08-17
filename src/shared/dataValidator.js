import _Class from '../models/_classes/_classModel';
import Alignment from '../models/natures/natureModel';
import Race from '../models/races/raceModel';
import switchToUpperCase from './switchToUpperCase';

const ValidateData = (errors) => {
  if (!errors.isEmpty()) {
    const { param } = errors.errors.find((value) => value.param);
    console.log(param);
    if (param) {
      return param;
    }
  }
};

export default ValidateData;

export const ValidateResource = async (resource, value) => {
  value = switchToUpperCase(value);

  switch (resource) {
    case '_class':
      try {
        const _classCheck = await _Class.find({ name: value });
        if (_classCheck.length === 0) {
          return { error: 'This class does not exist!' };
        }
        return null;
      } catch (error) {
        console.error(error);
        return error;
      }

    case 'alignment':
      try {
        const alignmentCheck = await Alignment.find({ name: value });
        if (alignmentCheck.length === 0) {
          return { error: 'This aligment does not exist!' };
        }
        return null;
      } catch (error) {
        console.error(error);
        return error;
      }

    case 'race':
      try {
        const raceCheck = await Race.find({ name: value });
        if (raceCheck.length === 0) {
          return { error: 'This race does not exist!' };
        }
        return null;
      } catch (error) {
        console.error(error);
        return error;
      }

    case 'gender':
      if (value !== 'Male' && value !== 'Female') {
        return { error: 'This gender does not exist!' };
      }
      return null;

    default:
      return null;
  }
};
