import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useDrop } from 'react-dnd';
import { EffectDragType } from '../../Effect';
import * as Effects from '../../../effects/index';
import { SignalChainOperator } from '../../../signal/chain';
import { signalChainNode } from '../../../signal';
import { SIGNALCHAIN } from '../../../actions';
import { useSignalChainStore } from '../../../stores/SignalChainProvider';

export function useSignalBlock({ audioContext, position }) {
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
      SignalChainOperator.disconnect({ signalChain: store });

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
      SignalChainOperator.disconnect({ signalChain: store });

      const disconnect = {
        type: SIGNALCHAIN.DISCONNECT,
        pos: Number(position),
      };

      dispatch(disconnect);
    }

    if (basket.length) {
      connectSignal();
    } else if (!basket.length && active) {
      disconnectSignal();
    }
  }, [basket.length, active]);

  return { basket, setBasket, DnDProps: { isOver, dropRef } };
}
