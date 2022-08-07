export default function createTrack(audioContext, audioElement) {
	const track = audioContext.createMediaElementSource(audioElement);

	return track;
}
