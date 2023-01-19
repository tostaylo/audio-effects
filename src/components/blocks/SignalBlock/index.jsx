import { h } from 'preact';
import { useSignalBlock } from './hooks/useSignalBlock';
import { useAudioEffectParams } from './hooks/useAudioEffectParams';
import { Effect } from '../Effect';
import { ArrowDownBox } from '../../icons/ArrowDownBox';

function classes({ id }) {
  const withoutItemClasses = `border-solid border-2 border-sky-500 `;

  return `${!id ? withoutItemClasses : ''} bg-slate-800 p-5 rounded-lg`;
}

export function SignalBlock({ position, audioContext }) {
  const {
    item: { id, type },
    setItem,
    DnDProps: { isOver, dropRef },
  } = useSignalBlock({
    audioContext,
    position,
  });

  const effects = useAudioEffectParams(id);

  return (
    <div className={classes({ id })} ref={dropRef}>
      {effects?.map((effect, idx) => (
        <div key={idx} className="flex flex-col">
          {Object.entries(effect.params)?.map(
            ([key, { set, min, max, step }]) => {
              const currentVal = effect.webAudioNode[key].value;

              return (
                <label className="flex justify-between" key={key} htmlFor={key}>
                  <input
                    onInput={(event) => {
                      set(effect.webAudioNode, Number(event.target.value));
                    }}
                    defaultValue={currentVal}
                    type="range"
                    id={key}
                    name={key}
                    min={min}
                    max={max}
                    step={step}
                  />
                  {key}
                </label>
              );
            }
          )}
        </div>
      ))}

      {id ? (
        <Effect
          key={id}
          id={id}
          type={type}
          onClose={() => {
            setItem({});
          }}
        />
      ) : (
        <span className={isOver ? 'opacity-0' : ''}>
          <ArrowDownBox />
        </span>
      )}
    </div>
  );
}
