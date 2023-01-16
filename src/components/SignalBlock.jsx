import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useDrop } from 'react-dnd';
import { Effect, EffectDragType } from './Effect';
import * as Effects from '../effects/index';
import { disconnectSignalChain } from '../signal/chain';
import { signalChainNode } from '../signal';
import { SIGNALCHAIN } from '../actions';
import signalChainStore from '../stores/signal-chain';

export function SignalBlock({ position, fixed, audioContext }) {
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
      disconnectSignalChain({ signalChainStore, fixed });

      const { type, id } = basket[0];

      const newNodes = await Effects[type](audioContext);
      // const newposition = signalChainStore.getState().length;

      const node = signalChainNode({ id, type, nodes: newNodes }, position);
      const connect = {
        type: SIGNALCHAIN.CONNECT,
        node,
      };

      signalChainStore.dispatch(connect);
    }

    function disconnectSignal() {
      disconnectSignalChain({ signalChainStore, fixed });

      const disconnect = {
        type: SIGNALCHAIN.DISCONNECT,
        pos: Number(position),
      };

      signalChainStore.dispatch(disconnect);
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
      style={{
        width: '100px',
        height: '100px',
        margin: '5px',
        border: '1px solid black',
      }}
      className="signal-block"
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
      {!basket.length && 'empty block'}
      {isOver && <div>You are close. Drop here</div>}
    </div>
  );
}
