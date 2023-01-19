const defaultOptions = {
  type: 'sine',
  detune: 500,
  frequency: 440,
};

export default function Tremelo(audioContext, options = defaultOptions) {
  const oscillator = new OscillatorNode(audioContext, options);
  oscillator.start();

  const gain = new GainNode(audioContext, (options = { gain: 0.5 }));

  const lowFrequencyOscillator = new OscillatorNode(audioContext, {
    type: 'sine',
    detune: 500,
    frequency: 5,
  });
  lowFrequencyOscillator.start();

  const lowFrequencyGain = new GainNode(
    audioContext,
    (options = { gain: 0.5 })
  );

  lowFrequencyOscillator.connect(lowFrequencyGain);
  lowFrequencyGain.connect(gain.gain);
  oscillator.connect(gain);

  return [gain];
}
