export default function Tremelo(audioContext: AudioContext) {
  const oscillator: OscillatorNode = new OscillatorNode(audioContext, {
    type: 'sine',
    detune: 100,
    frequency: 440,
  });
  oscillator.start();
  const lowFrequencyOscillator = new OscillatorNode(audioContext, {
    type: 'sine',
    detune: 500,
    frequency: 5,
  });
  lowFrequencyOscillator.start();

  const gain = new GainNode(audioContext, { gain: 0.5 });
  const lowFrequencyGain = new GainNode(audioContext, { gain: 0.5 });

  lowFrequencyOscillator.connect(lowFrequencyGain);
  lowFrequencyGain.connect(gain.gain);
  oscillator.connect(gain);

  return [gain];
}
