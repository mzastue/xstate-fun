import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { stateOfMatterMachine } from '../stateMachines/stateOfMatter/stateOfMatterMachine';
import css from './StateOfMatter.module.css';

const StateOfMatter = () => {
  const [changeTempBy, setChangeTempBy] = useState<number>(1);
  const [state, send] = useMachine(
    stateOfMatterMachine.withContext({
      boilingPoint: 100,
      meltingPoint: 0,
      temperature: 10,
    })
  );

  return (
    <div className={css.wrapper}>
      <div className={css.buttons}>
        <label htmlFor="temp">Temp diff</label>
        <input
          id="temp"
          type="number"
          value={changeTempBy}
          onChange={(e) => setChangeTempBy(Number(e.target.value))}
        />
        <button onClick={() => send('HEAT', { value: changeTempBy })}>
          Increase temp
        </button>
        <button onClick={() => send('COOL_DOWN', { value: changeTempBy })}>
          Decrease temp
        </button>
      </div>

      <div className={css.content}>
        <div>{state.context.temperature} degrees celsius</div>
        {
          <span
            className={`${css.icon} ${
              state.matches('solid') ? css.active : css.inactive
            }`}
          >
            ❄️
          </span>
        }
        {
          <span
            className={`${css.icon} ${
              state.matches('liquid') ? css.active : css.inactive
            }`}
          >
            💧
          </span>
        }
        {
          <span
            className={`${css.icon} ${
              state.matches('gas') ? css.active : css.inactive
            }`}
          >
            💨
          </span>
        }
      </div>
    </div>
  );
};

export default StateOfMatter;
