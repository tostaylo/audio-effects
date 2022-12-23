export default function Compressor(audioContext, options = {}) {
  const { currentTime } = audioContext;
  const compressor = audioContext.createDynamicsCompressor();

  compressor.threshold.setValueAtTime(options.threshold, currentTime);
  compressor.knee.setValueAtTime(options.knee, currentTime);
  compressor.attack.setValueAtTime(options.attack, currentTime);
  compressor.release.setValueAtTime(options.release, currentTime);
  compressor.ratio.setValueAtTime(options.ratio, currentTime);

  return compressor;
}
