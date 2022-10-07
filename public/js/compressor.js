export default function Compressor(audioContext) {
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-40, audioContext.currentTime);
  compressor.knee.setValueAtTime(40, audioContext.currentTime);
  compressor.ratio.setValueAtTime(15, audioContext.currentTime);
  compressor.attack.setValueAtTime(5, audioContext.currentTime);
  compressor.release.setValueAtTime(-1, audioContext.currentTime);

  return compressor;
}
