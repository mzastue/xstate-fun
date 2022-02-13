import { assign, createMachine } from 'xstate';
import { isSolid, isLiquid, isGas, isPlasma } from './utils/stateChecker';
import { StateOfMatterContext } from './types';

export const stateOfMatterMachine = createMachine<StateOfMatterContext>({
  context: {
    name: 'unknown mattery',
    boilingPoint: undefined,
    meltingPoint: undefined,
    pressure: 1000,
    temperature: undefined,
  },
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        { target: 'liquid', cond: isLiquid },
        { target: 'gas', cond: isGas },
        { target: 'solid', cond: isSolid },
        { target: 'plasma', cond: isPlasma },
      ],
    },
    liquid: {
      on: {
        VAPORIZE: {
          target: 'gas',
        },
        FREEZE: {
          target: 'solid',
        },
      },
      always: [
        { target: 'gas', cond: isGas },
        { target: 'solid', cond: isSolid },
        { target: 'plasma', cond: isPlasma },
      ],
    },
    gas: {
      on: {
        DEPOSIT: { target: 'solid' },
        CONDENSE: { target: 'liquid' },
        IONIZE: { target: 'plasma' },
      },
      always: [
        { target: 'liquid', cond: isLiquid },
        { target: 'solid', cond: isSolid },
        { target: 'plasma', cond: isPlasma },
      ],
    },
    solid: {
      on: {
        MELT: { target: 'liquid' },
        SUBLIME: { target: 'gas' },
      },
      always: [
        { target: 'liquid', cond: isLiquid },
        { target: 'gas', cond: isGas },
        { target: 'plasma', cond: isPlasma },
      ],
    },
    plasma: {
      on: {
        DEIONIZE: { target: 'gas' },
      },
      always: [
        { target: 'liquid', cond: isLiquid },
        { target: 'gas', cond: isGas },
        { target: 'solid', cond: isSolid },
      ],
    },
  },
  on: {
    COOL_DOWN: {
      actions: assign({
        temperature: ({ temperature }, { value }) => {
          return Number(temperature) - value;
        },
      }),
    },
    HEAT: {
      actions: assign({
        temperature: ({ temperature }, { value }) =>
          Number(temperature) + value,
      }),
    },
    INCREASE_PRESSURE: {},
    DECREASE_PRESSURE: {},
  },
});
