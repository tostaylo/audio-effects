import { h } from 'preact';
import { useSignalBlock } from './hooks/useSignalBlock';
import { Effect } from '../Effect';
import { ArrowDownBox } from '../../icons/ArrowDownBox';
import { EffectParams } from './components/EffectParams';

function classes({ id }) {
  const withoutItemClasses = `border-solid border-2 border-sky-500 h-[200px]`;
  const withItemClasses = `border-2 border-gray-700 shadow-lg`;

  return `${
    !id ? withoutItemClasses : withItemClasses
  } bg-slate-800 w-[220px] p-2 flex flex-col justify-center items-center rounded-lg`;
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
      <EffectParams id={id} />
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
