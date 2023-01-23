import Distortion from './distortion';

export default function Fuzz(audioContext: AudioContext): AudioNode[] {
  const lowPassFilter = audioContext.createBiquadFilter();
  lowPassFilter.type = 'lowpass';
  lowPassFilter.frequency.value = 147;
  lowPassFilter.Q.value = 0.7071;

  // const bandpassFilter = audioContext.createBiquadFilter();
  // bandpassFilter.type = 'bandpass';
  // bandpassFilter.frequency.value = 587;
  // bandpassFilter.Q.value = 0.7071;

  // const highPassFilter = audioContext.createBiquadFilter();
  // highPassFilter.type = 'highpass';
  // highPassFilter.frequency.value = 4980;
  // highPassFilter.Q.value = 0.7071;

  const preGain = new GainNode(audioContext, {
    gain: 0.6,
  });

  const postGain = new GainNode(audioContext, {
    gain: 0.6,
  });

  const distortion = Distortion(audioContext, 100);

  return [preGain, lowPassFilter, ...distortion, postGain];
}
