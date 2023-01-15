import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useDrop } from 'react-dnd';
import { Effect, EffectDragType } from './Effect';

export function SignalBlock() {
  const [basket, setBasket] = useState([]);
  const [{ isOver }, dropRef] = useDrop({
    accept: EffectDragType,
    drop: (item) =>
      setBasket((basket) =>
        !basket.includes(item) ? [...basket, item] : basket
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        margin: '5px',
        border: '1px solid black',
      }}
      className="signal-block"
      ref={dropRef}
    >
      {basket.map((effect) => (
        <Effect key={effect.id} id={effect.id} name={effect.name} />
      ))}
      {!basket.length && 'empty block'}
      {isOver && <div>Your close. Drop here</div>}
    </div>
  );
}
