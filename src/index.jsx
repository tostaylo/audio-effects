import { render, h } from 'preact';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignalChain } from './components/SignalChain';
import { EffectList } from './components/EffectList';
import { StartStopAudio } from './components/StartStopAudio';
import { SignalChainProvider } from './stores/SignalChainProvider';
import { initialize } from './audio';

initialize()
  .then(({ audioContext, fixed, track, audioElement }) => {
    const App = (
      <SignalChainProvider track={track} fixed={fixed}>
        <DndProvider backend={HTML5Backend}>
          <EffectList />
          <SignalChain audioContext={audioContext} fixed={fixed} />
          <StartStopAudio
            track={track}
            audioContext={audioContext}
            audioElement={audioElement}
            fixed={fixed}
          />
        </DndProvider>
      </SignalChainProvider>
    );

    render(App, document.getElementById('root'));
  })
  .catch((error) => console.error(error));
