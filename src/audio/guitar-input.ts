async function createGuitarInput(
  audioContext: AudioContext
): Promise<MediaStreamAudioSourceNode> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return audioContext.createMediaStreamSource(stream);
  } catch (error: any) {
    if (error.name === 'NotAllowedError') {
      throw new Error(
        'Microphone permission denied. Please allow microphone access and try again.'
      );
    } else if (error.name === 'NotFoundError') {
      throw new Error(
        'No microphone found. Please connect a microphone and try again.'
      );
    } else {
      throw new Error(`Failed to access microphone: ${error.message}`);
    }
  }
}

export { createGuitarInput };
