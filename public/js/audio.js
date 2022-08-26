import DOM from './dom.js';
import Reverb from './reverb.js';
import Distortion from './distortion.js';
import Gain from './gain.js';
import createTrack from './track.js';
import waveformVisualizer from './visualizer.js';
import impulseResponse from './impulse-response.js';

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  const track = createTrack(audioContext, audioElement);

  const convolver = await impulseResponse(audioContext);
  const analyser = audioContext.createAnalyser();

  waveformVisualizer(analyser);

  const distortionNode = Distortion(audioContext);

  const preAmpGainNode = Gain(audioContext);
  const postAmpGainNode = Gain(audioContext, { gain: 2 });
  const reverbNode = await Reverb(audioContext);

  track
    .connect(preAmpGainNode)
    .connect(distortionNode)
    .connect(reverbNode)
    .connect(convolver)
    .connect(postAmpGainNode)
    .connect(analyser)
    .connect(audioContext.destination);

  DOM({ gainNode: preAmpGainNode, distortionNode, reverbNode }, audioContext);
}

await initialize();
