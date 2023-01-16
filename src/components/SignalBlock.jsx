import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useDrop } from 'react-dnd';
import { Effect, EffectDragType } from './Effect';
import * as Effects from '../effects/index';
import { disconnectSignalChain } from '../signal/chain';
import { signalChainNode } from '../signal';
import { SIGNALCHAIN } from '../actions';
import { useSignalChainStore } from '../stores/SignalChainProvider';

export function SignalBlock({ position, audioContext }) {
  const { store, dispatch } = useSignalChainStore();

  const [basket, setBasket] = useState([]);
  const [active, setActive] = useState(false);

  const [{ isOver }, dropRef] = useDrop({
    accept: EffectDragType,
    drop: (item) => {
      setActive(true);
      return setBasket((basket) =>
        !basket.includes(item) ? [...basket, item] : basket
      );
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    async function connectSignal() {
      disconnectSignalChain({ signalChain: store });

      const { type, id } = basket[0];

      const newNodes = await Effects[type](audioContext);

      const node = signalChainNode({ id, type, nodes: newNodes }, position);
      const connect = {
        type: SIGNALCHAIN.CONNECT,
        node,
      };

      dispatch(connect);
    }

    function disconnectSignal() {
      disconnectSignalChain({ signalChain: store });

      const disconnect = {
        type: SIGNALCHAIN.DISCONNECT,
        pos: Number(position),
      };

      dispatch(disconnect);
    }

    if (basket.length) {
      connectSignal();
    } else if (!basket.length && active) {
      console.log('disconnection');
      disconnectSignal();
    }
  }, [basket.length, active]);

  return (
    <div
      className={`border-solid border-2 border-sky-${
        !isOver && !basket.length ? '500' : '100'
      } p-5 rounded-lg`}
      ref={dropRef}
    >
      {basket.map(({ id, type }) => (
        <Effect
          key={id}
          id={id}
          type={type}
          onClose={() => {
            setBasket([]);
          }}
        />
      ))}
      {!basket.length && (
        <span className={isOver ? 'opacity-0' : ''}>empty block</span>
      )}
    </div>
  );
}
