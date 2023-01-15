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
      style={{
        border: '1px solid black',
        borderRadius: '5px',
        margin: '5px',
        display: 'inline-block',
        padding: '5px',
      }}
      className="effect"
      ref={dragRef}
    >
      {type}
      {isDragging && '😱'}
      {onClose && <button onClick={onClose}>X</button>}
    </div>
  );
}
