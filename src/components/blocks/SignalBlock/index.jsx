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
  const effectNode = store.find((effect) => effect.id === id);
  const webAudioNode = effectNode?.nodes?.[0];

  return (
    <div className={classes({ id })} ref={dropRef}>
      {webAudioNode &&
        params &&
        params.map((param) => (
          <label key={param} htmlFor={param}>
            <input
              onInput={(event) => {
                webAudioNode[param].value = event.target.value;
              }}
              defaultValue={webAudioNode[param].value}
              type="range"
              id={param}
              name={param}
              min="0"
              max="10"
              step={'0.5'}
            />
            {param}
          </label>
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
