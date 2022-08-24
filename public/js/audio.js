import DOM from './dom.js';
import Reverb from './reverb.js';
import Distortion from './distortion.js';
import Gain from './gain.js';
import createTrack from './track.js';
import waveformVisualizer from './visualizer.js';

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  const track = createTrack(audioContext, audioElement);

  const analyser = audioContext.createAnalyser();

  waveformVisualizer(analyser);

  const distortionNode = Distortion(audioContext);
  const gainNode = Gain(audioContext);
  const reverbNode = await Reverb(audioContext);

  track
    .connect(gainNode)
    .connect(distortionNode)
    .connect(reverbNode)
    .connect(analyser)
    .connect(audioContext.destination);

  DOM({ gainNode, distortionNode, reverbNode, track }, audioContext);
}

await initialize();
