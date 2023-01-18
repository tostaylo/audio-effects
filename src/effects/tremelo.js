const defaultOptions = {
  type: 'sine',
  detune: 500,
  frequency: 440,
};

export default function Tremelo(audioContext, options = defaultOptions) {
  console.log(options, audioContext);
}
