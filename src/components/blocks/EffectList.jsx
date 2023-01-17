import { h } from 'preact';
import { Effect } from './Effect';
import { createDistortionCurve } from '../../effects/distortion';

const EFFECTS = [
  {
    id: 'fuzz-3r3r3',
    type: 'Fuzz',
  },
  {
    id: 'gain-3444r3',
    type: 'Gain',
    params: {
      gain: {
        set: (node, value) => (node.gain.value = value),
        step: 0.02,
        max: 100,
        min: 0,
      },
    },
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
    params: {
      delayTime: {
        set: (node, value) => (node.delayTime.value = value),
        step: 0.02,
        max: 1,
        min: 0,
      },
    },
  },
  {
    id: 'distortion-ytyty',
    type: 'Distortion',
    params: {
      curve: {
        set: (node, value) => (node.curve = createDistortionCurve(value * 5)),
        step: 1,
        max: 100,
        min: 0,
      },
    },
  },
  {
    id: 'impulse-response-ytyty',
    type: 'ImpulseResponse',
  },
];

export function EffectList() {
  return (
    <div className="flex justify-around mb-10">
      {EFFECTS.map(({ id, type, params }) => (
        <Effect key={id} id={id} draggable type={type} params={params} />
      ))}
    </div>
  );
}
