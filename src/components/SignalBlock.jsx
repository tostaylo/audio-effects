import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useDrop } from 'react-dnd';
import { Effect, EffectDragType } from './Effect';
import * as Effects from '../effects/index';
import { disconnectSignalChain } from '../signal/chain';
import { signalChainNode } from '../signal';
import { SIGNALCHAIN } from '../actions';
import { useSignalChainStore } from '../stores/SignalChainProvider';

export function SignalBlock({ position, fixed, audioContext }) {
  const { store, dispatch } = useSignalChainStore();

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

  useEffect(() => {
    async function connectSignal() {
      disconnectSignalChain({ signalChainStore: store, fixed });

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
      disconnectSignalChain({ signalChainStore: store, fixed });

      const disconnect = {
        type: SIGNALCHAIN.DISCONNECT,
        pos: Number(position),
      };

      dispatch(disconnect);
    }

    // TODO: Possible bug calling these on mount
    if (basket.length) {
      connectSignal();
    } else {
      disconnectSignal();
    }
  }, [basket.length]);

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
