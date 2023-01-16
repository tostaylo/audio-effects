import { h } from 'preact';
import { useSignalBlock } from './hooks/useSignalBlock';
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

  return (
    <div className={classes({ id })} ref={dropRef}>
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
