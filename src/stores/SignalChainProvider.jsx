import { signalChainStore } from '.';
import { h, createContext } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks';
import { modifySignalChain } from '../signal/chain';

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
  const [store, setStore] = useState(signalChainStore.getState());

  useEffect(() => {
    signalChainStore.subscribe(() => {
      const newStore = signalChainStore.getState();
      modifySignalChain({
        track,
        fixed,
        signalChain: newStore,
      });

      setStore(newStore);
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
