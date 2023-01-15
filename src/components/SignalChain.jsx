import { h } from 'preact';
import { SignalBlock } from './SignalBlock';

export function SignalChain({ fixed, audioContext }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {[0, 1, 2, 3].map((item) => (
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
