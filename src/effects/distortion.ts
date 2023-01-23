export default function Distortion(
  audioContext: AudioContext,
  amount = 20
): AudioNode[] {
  const distortionFilter = audioContext.createWaveShaper();
  distortionFilter.curve = createDistortionCurve(amount);

  return [distortionFilter];
}

export function createDistortionCurve(amount = 20) {
  const n_samples = 256,
    curve = new Float32Array(n_samples);

  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}
