const defaultOptions = {
  type: 'sine',
  detune: 500,
  frequency: 440,
};

function Oscillator(audioContext, options = defaultOptions) {
  const { currentTime } = audioContext;
  const tremelo = audioContext.createOscillator();

  tremelo.type.setValueAtTime(options.type, currentTime);
  tremelo.detune.setValueAtTime(options.detune, currentTime);
  tremelo.frequency.setValueAtTime(options.frequency, currentTime);

  return [tremelo];
}

export default function Tremelo(audioContext) {
  const gainNode = new GainNode(audioContext, 2);

  const tremelo = Oscillator.start();

  return [gainNode, tremelo];
}
