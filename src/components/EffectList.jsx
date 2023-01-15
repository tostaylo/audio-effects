import { h } from 'preact';
import { Effect } from './Effect';

const EFFECTS = [
  { id: 1, name: 'fuzz' },
  { id: 2, name: 'delay' },
  { id: 3, name: 'distortion' },
  { id: 4, name: 'reverb' },
];

export function EffectList() {
  return (
    <div className="effects">
      {EFFECTS.map((effect) => (
        <Effect key={effect.id} draggable id={effect.id} name={effect.name} />
      ))}
    </div>
  );
}
