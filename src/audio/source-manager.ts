import { createGuitarInput } from './guitar-input';
import { AudioSource } from '../types';

export type SourceManager = {
  currentSource: AudioSource | null;
  guitarInput: MediaStreamAudioSourceNode | null;
  audioFileTrack: AudioSource;
};

export async function switchToGuitar(
  audioContext: AudioContext,
  manager: SourceManager
): Promise<MediaStreamAudioSourceNode> {
  // Lazy-load guitar input on first use
  if (!manager.guitarInput) {
    manager.guitarInput = await createGuitarInput(audioContext);
  }

  // Disconnect current source if any
  if (manager.currentSource) {
    manager.currentSource.disconnect();
  }

  manager.currentSource = manager.guitarInput;
  return manager.guitarInput;
}

export function switchToFile(manager: SourceManager): AudioSource {
  // Disconnect current source if any
  if (manager.currentSource) {
    manager.currentSource.disconnect();
  }

  manager.currentSource = manager.audioFileTrack;
  return manager.audioFileTrack;
}
