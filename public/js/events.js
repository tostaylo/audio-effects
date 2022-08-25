import { createDistortionCurve } from './distortion.js';

function handleGain(gainNode, value) {
  gainNode.gain.value = value;
  console.log(gainNode.gain.value);
}

function handleDistortion(distortionFilter, value) {
  const distortion = value * 10;
  console.log(distortion);
  distortionFilter.curve = createDistortionCurve(distortion);
}

export { handleDistortion, handleGain, handleReverb };
