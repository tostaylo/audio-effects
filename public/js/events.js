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

function handleReverb(reverbNode, value, track) {
  if (value == true) {
    track.connect(reverbNode);
    reverbNode.normalize = true;
    console.log('reverb turned on');
  } else {
    reverbNode.disconnect();
    console.log('reverb turned off');
  }
}

export { handleDistortion, handleGain, handleReverb };
