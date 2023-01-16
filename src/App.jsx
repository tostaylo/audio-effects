import { h } from 'preact';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignalChain } from './components/blocks/SignalChain';
import { EffectList } from './components/blocks/EffectList';
import { StartStopAudio } from './components/blocks/StartStopAudio';
import { SignalChainProvider } from './stores/SignalChainProvider';
import { Visualizer } from './components/blocks/Visualizer';
import { Main } from './components/system/Main';

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
