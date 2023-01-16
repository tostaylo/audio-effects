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
  {
    id: 'compressor-399',
    type: 'Compressor',
  },
  {
    id: 'delay-rjrjr9',
    type: 'Delay',
  },
  {
    id: 'distortion-ytyty',
    type: 'Distortion',
  },
  {
    id: 'impulse-response-ytyty',
    type: 'ImpulseResponse',
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
