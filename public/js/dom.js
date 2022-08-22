import { handleDistortion, handleGain, handleReverb } from './events.js';

export default function DOM(
  { gainNode, distortionNode, reverbNode },
  audioContext
) {
  const volumeControl = document.querySelector('#volume');
  volumeControl.addEventListener(
    'input',
    (e) => handleGain(gainNode, e.target.value),
    false
  );

  const distortionControl = document.querySelector('#distortion');
  distortionControl.addEventListener(
    'input',
    (e) => handleDistortion(distortionNode, e.target.value),
    false
  );

  const reverbControl = document.querySelector('#reverb');
  reverbControl.addEventListener('change', () => {
    const selectOptions = document.querySelector('#reverb');
    if (selectOptions.value == '1') {
      handleReverb(reverbNode, true);
    } else {
      handleReverb(reverbNode, false);
    }
  });

  const playButton = document.querySelector('button');
  const audioElement = document.querySelector('audio');
  playButton.addEventListener(
    'click',
    (e) => handlePlayPause(audioContext, audioElement, e),
    false
  );
}

export function handlePlayPause(audioContext, audioElement, e) {
  const { dataset } = e.target;
  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // play or pause track depending on state
  if (dataset.playing === 'false') {
    audioElement.play();
    dataset.playing = 'true';
  } else if (dataset.playing === 'true') {
    audioElement.pause();
    dataset.playing = 'false';
  }
}
