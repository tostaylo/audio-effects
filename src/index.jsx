import { render, h } from 'preact';
import { App } from './App';
import { initialize } from './audio';

initialize()
  .then(({ audioContext, fixed, track, audioElement, analyser }) => {
    render(
      <App
        audioContext={audioContext}
        fixed={fixed}
        track={track}
        audioElement={audioElement}
        analyser={analyser}
      />,
      document.getElementById('root')
    );
  })
  .catch((error) => console.error(error));
