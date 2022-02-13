import { StateOfMatterContext } from '../types';

const isNumber = (value: undefined | number): value is number =>
  typeof value !== 'undefined';

const isLiquid = ({
  temperature,
  boilingPoint,
  meltingPoint,
}: StateOfMatterContext): boolean => {
  if (
    !isNumber(temperature) ||
    !isNumber(meltingPoint) ||
    !isNumber(boilingPoint)
  ) {
    return false;
  }

  return temperature > meltingPoint && temperature < boilingPoint;
};

const isSolid = ({
  temperature,
  boilingPoint,
  meltingPoint,
}: StateOfMatterContext): boolean => {
  if (
    !isNumber(temperature) ||
    !isNumber(meltingPoint) ||
    !isNumber(boilingPoint)
  ) {
    return false;
  }

  return temperature <= meltingPoint;
};

const isGas = ({
  temperature,
  boilingPoint,
  meltingPoint,
}: StateOfMatterContext): boolean => {
  if (
    !isNumber(temperature) ||
    !isNumber(meltingPoint) ||
    !isNumber(boilingPoint)
  ) {
    return false;
  }

  return temperature >= boilingPoint;
};

const isPlasma = () => false; /* temporary, because pressure is needed */

export { isLiquid, isGas, isSolid, isPlasma };
