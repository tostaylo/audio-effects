import { h } from 'preact';
import { useSignalBlock } from './hooks/useSignalBlock';
import { Effect } from '../Effect';

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
          <ArrowDown />
        </span>
      )}
    </div>
  );
}
function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
      />
    </svg>
  );
}
