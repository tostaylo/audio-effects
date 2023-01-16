import { h } from 'preact';
import { SignalBlock } from './SignalBlock';

export function SignalChain({ fixed, audioContext }) {
  return (
    <div className="flex justify-around mb-10">
      {[0, 1, 2, 3, 4, 5, 6].map((item) => (
        <SignalBlock
          fixed={fixed}
          audioContext={audioContext}
          position={item}
          key={item}
        />
      ))}
    </div>
  );
}
