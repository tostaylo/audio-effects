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
      className="text-center w-[160px] bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 py-6 px-2 rounded-lg cursor-move relative shadow-md hover:shadow-lg hover:border-gray-600 transition-all"
      ref={dragRef}
    >
      <div className="text-sky-400 font-bold text-sm tracking-wide">
        {type}
      </div>
      {isDragging && (
        <span className="absolute inset-0 flex items-center justify-center text-4xl">
          😱
        </span>
      )}
      {onClose && (
        <button
          className="absolute right-2 top-2 w-6 h-6 flex items-center justify-center text-sm text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded transition-colors font-bold"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
}
