import { handleDistortion, handleGain } from './events.js';

export default function DOM({ gainNode, distortionNode }, audioContext) {
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
}
