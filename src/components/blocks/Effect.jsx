import { h } from 'preact';
import { useDrag } from 'react-dnd';

export const EffectDragType = 'effect';

export function Effect({ id, type, onClose }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: EffectDragType,
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      data-test-id={id}
      className="bg-slate-800 border-solid border-2 border-slate-900 p-2 rounded-lg cursor-pointer relative"
      ref={dragRef}
    >
      {type}
      {isDragging && '😱'}
      {onClose && (
        <button
          className="absolute right-1 top-0 text-xs text-sky-400"
          onClick={onClose}
        >
          X
        </button>
      )}
    </div>
  );
}
