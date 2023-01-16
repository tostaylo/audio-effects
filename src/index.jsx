import { render, h } from 'preact';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignalChain } from './components/SignalChain';
import { EffectList } from './components/EffectList';
import { StartStopAudio } from './components/StartStopAudio';
import initialize from './audio';

initialize()
  .then(({ audioContext, fixed, track, audioElement }) => {
    const App = (
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
    );

    render(App, document.getElementById('root'));
  })
  .catch((error) => console.error(error));
