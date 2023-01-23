import { render, h } from 'preact';
import { App } from './App';
import { initialize } from './audio/audio';

initialize()
  .then(({ audioContext, track, audioElement, analyser }) => {
    render(
      <App
        audioContext={audioContext}
        track={track}
        audioElement={audioElement}
        analyser={analyser}
      />,
      document.getElementById('root')
    );
  })
  .catch((error) => console.error(error));
