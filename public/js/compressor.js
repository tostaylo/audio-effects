// export default function Compressor(audioContext) {
//   const compressor = audioContext.createDynamicsCompressor();
//   compressor.threshold.setValueAtTime(-40, audioContext.currentTime);
//   compressor.knee.setValueAtTime(40, audioContext.currentTime);
//   compressor.ratio.setValueAtTime(15, audioContext.currentTime);
//   compressor.attack.setValueAtTime(5, audioContext.currentTime);
//   compressor.release.setValueAtTime(-1, audioContext.currentTime);

//   return compressor;
// }

// export default function Compressor(audioContext) {
//   const {
//     currentTime,
//     createDynamicsCompressor
//   } = audioContext
//   const compressor = {
//     compressor: createDynamicsCompressor(),
//     threshold: -40,
//     knee: 40,
//     ratio: 15,
//     attack: 5,
//     release: -1
//   }
//   compressor.threshold.setValueAtTime(threshold, currentTime)
//   compressor.knee.setValueAtTime(knee, currentTime)
//   compressor.ratio.setValueAtTime(ratio, currentTime)
//   compressor.attack.setValueAtTime(attack, currentTime)
//   compressor.release.setValueAtTime(release, currentTime)

//   return compressor
// }

export default function Compressor(
  audioContext,
  options = {
    threshold: 29,
    knee: 30,
    attack: 23,
    release: 23,
    ratio: 21,
  }
) {
  const { currentTime, createDynamicsCompressor } = audioContext;
  const compressor = createDynamicsCompressor();
  compressor.threshold.setValueAtTime(options.threshold, currentTime);
  compressor.knee.setValueAtTime(options.knee, currentTime);
  compressor.attack.setValueAtTime(options.attack, currentTime),
    compressor.release.setValueAtTime(options.release, currentTime);
  compressor.ratio.setValueAtTime(options.ratio, currentTime);

  return compressor;
}
