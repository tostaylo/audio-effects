function handleGain(gainNode, value) {
  gainNode.gain.value = value;
  console.log(gainNode.gain.value);
}

export { handleGain };
