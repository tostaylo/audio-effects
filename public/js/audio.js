import DOM from './dom.js';
import Distortion from './distortion.js';
import Gain from './gain.js';
import createTrack from './track.js';

export default function initialize() {
	const audioContext = new AudioContext();
	const audioElement = document.querySelector('audio');

	const track = createTrack(audioContext, audioElement);

	const distortionNode = Distortion(audioContext);
	const gainNode = Gain(audioContext);

	track.connect(gainNode).connect(distortionNode).connect(audioContext.destination);

	DOM({ gainNode, distortionNode }, audioContext);
}

initialize();
