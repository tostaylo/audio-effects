import { signalChainStore } from '.';
import { h, createContext } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks';
import { modifySignalChain } from '../signal/chain';

function completeSignalChain({ store, fixed }) {
  return [...store, ...fixed];
}

const SignalChainContext = createContext();

export function useSignalChainStore() {
  const context = useContext(SignalChainContext);

  if (context === undefined) {
    throw new Error(
      'useSignalChainStore must be used within a SignalChainStoreProvider'
    );
  }
  return context;
}

export function SignalChainProvider({ children, track, fixed }) {
  const [store, setStore] = useState(
    completeSignalChain({ store: signalChainStore.getState(), fixed })
  );

  useEffect(() => {
    signalChainStore.subscribe(() => {
      const newStore = signalChainStore.getState();
      const signalChain = completeSignalChain({ store: newStore, fixed });
      modifySignalChain({
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
