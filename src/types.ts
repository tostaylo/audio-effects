export type AudioSource =
  | MediaElementAudioSourceNode
  | MediaStreamAudioSourceNode;

export type WebAudioInit = {
  audioContext: AudioContext;
  track: AudioSource;
  audioElement: HTMLAudioElement;
  analyser: AnalyserNode;
};
