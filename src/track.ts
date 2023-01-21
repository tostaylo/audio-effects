export default function createTrack(
  audioContext: AudioContext,
  audioElement: HTMLAudioElement
): MediaElementAudioSourceNode {
  return audioContext.createMediaElementSource(audioElement);
}
