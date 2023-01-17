import { h } from 'preact';
import { useSignalBlock } from './hooks/useSignalBlock';
import { Effect } from '../Effect';
import { ArrowDownBox } from '../../icons/ArrowDownBox';
import { useSignalChainStore } from '../../../stores/SignalChainProvider';

function classes({ id }) {
  const withoutItemClasses = `border-solid border-2 border-sky-500 `;

  return `${!id ? withoutItemClasses : ''} bg-slate-800 p-5 rounded-lg`;
}

export function SignalBlock({ position, audioContext }) {
  const {
    item: { id, type, params },
    setItem,
    DnDProps: { isOver, dropRef },
  } = useSignalBlock({
    audioContext,
    position,
  });

  const { store } = useSignalChainStore();
  const storeEffect = store.find((effect) => effect.id === id);
  const webAudioNode = storeEffect?.nodes?.[0];

  return (
    <div className={classes({ id })} ref={dropRef}>
      {webAudioNode && params && (
        <div className="flex flex-col">
          {Object.entries(params)?.map(([key, { set, min, max, step }]) => {
            const currentVal = webAudioNode[key].value;

            return (
              <label className="flex justify-between" key={key} htmlFor={key}>
                <input
                  onInput={(event) => {
                    set(webAudioNode, Number(event.target.value));
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
          })}
        </div>
      )}

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
