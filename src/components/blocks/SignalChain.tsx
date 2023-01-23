import { h } from 'preact';
import { SignalBlock } from './SignalBlock';

export function SignalChain({ audioContext }: { audioContext: AudioContext }) {
  return (
    <div className="flex flex-wrap w-full justify-around mb-10">
      {[0, 1, 2, 3, 4, 5, 6].map((item) => (
        <SignalBlock audioContext={audioContext} position={item} key={item} />
      ))}
    </div>
  );
}
