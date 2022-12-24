const defaultOptions = {
  threshold: -40,
  knee: 30,
  attack: 1,
  release: 1,
  ratio: 15,
};

export default function Compressor(audioContext, options = defaultOptions) {
  const { currentTime } = audioContext;
  const compressor = audioContext.createDynamicsCompressor();

  compressor.threshold.setValueAtTime(options.threshold, currentTime);
  compressor.knee.setValueAtTime(options.knee, currentTime);
  compressor.attack.setValueAtTime(options.attack, currentTime);
  compressor.release.setValueAtTime(options.release, currentTime);
  compressor.ratio.setValueAtTime(options.ratio, currentTime);

  return compressor;
}
