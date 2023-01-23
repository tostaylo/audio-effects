import { signalChainStore } from '.';
import { h, createContext, ComponentChildren } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks';
import { SignalChainOperator } from '../signal/chain';
import { WebAudioInit } from '../types';

function completeSignalChain({ store, fixed }) {
  return [...store, ...fixed];
}

const SignalChainContext = createContext(null);

export function useSignalChainStore() {
  const context = useContext(SignalChainContext);

  if (context === undefined) {
    throw new Error(
      'useSignalChainStore must be used within a SignalChainStoreProvider'
    );
  }
  return context;
}

type Props = {
  track: WebAudioInit['track'];
  fixed: Array<AudioNode>;
  children: ComponentChildren;
};
export function SignalChainProvider({ children, track, fixed }: Props) {
  const [store, setStore] = useState(
    completeSignalChain({ store: signalChainStore.getState(), fixed })
  );

  useEffect(() => {
    signalChainStore.subscribe(() => {
      const newStore = signalChainStore.getState();
      const signalChain = completeSignalChain({ store: newStore, fixed });
      SignalChainOperator.modify({
        track,
        signalChain,
      });

      setStore(signalChain);
      console.log({ newStore });
    });
  }, []);

  return (
    <SignalChainContext.Provider
      value={{ store, dispatch: signalChainStore.dispatch }}
    >
      {children}
    </SignalChainContext.Provider>
  );
}
