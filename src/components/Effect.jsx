import { h } from 'preact';
import { useDrag } from 'react-dnd';

export const EffectDragType = 'effect';

export function Effect({ id, name }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: EffectDragType,
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div style={{ border: '1px solid red' }} className="effect" ref={dragRef}>
      {name}
      {isDragging && '😱'}
    </div>
  );
}
