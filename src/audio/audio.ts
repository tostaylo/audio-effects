import createTrack from './track.js';
import { WebAudioInit } from '../types.js';

async function initialize(): Promise<WebAudioInit> {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const audioElement = document.querySelector('audio');
  const track = createTrack(audioContext, audioElement);

  return { audioContext, track, audioElement, analyser };
}

export { initialize };
