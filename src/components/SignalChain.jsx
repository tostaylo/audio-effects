import { h } from 'preact';
import { SignalBlock } from './SignalBlock';

export function SignalChain() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <SignalBlock key={item} />
      ))}
    </div>
  );
}
