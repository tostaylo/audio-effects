import { h } from 'preact';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignalChain } from './components/SignalChain';
import { EffectList } from './components/EffectList';
import { StartStopAudio } from './components/StartStopAudio';
import { SignalChainProvider } from './stores/SignalChainProvider';
import { Visualizer } from './components/Visualizer';
import { Main } from './components/Main';

export function App({ track, analyser, audioContext, audioElement }) {
  return (
    <SignalChainProvider
      track={track}
      fixed={[analyser, audioContext.destination]}
    >
      <Main>
        <Visualizer analyser={analyser} />
        <DndProvider backend={HTML5Backend}>
          <EffectList />
          <SignalChain audioContext={audioContext} />
        </DndProvider>
        <StartStopAudio
          track={track}
          audioContext={audioContext}
          audioElement={audioElement}
        />
      </Main>
    </SignalChainProvider>
  );
}
