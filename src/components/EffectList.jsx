import { h } from 'preact';
import { Effect } from './Effect';

const EFFECTS = [
  {
    id: 'fuzz-3r3r3',
    type: 'Fuzz',
  },
  {
    id: 'gain-3444r3',
    type: 'Gain',
  },
  {
    id: 'reverb-3939',
    type: 'Reverb',
  },
];

export function EffectList() {
  return (
    <div className="effects">
      {EFFECTS.map(({ id, type }) => (
        <Effect key={id} id={id} draggable type={type} />
      ))}
    </div>
  );
}
