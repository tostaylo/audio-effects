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
    // TODO: Don't think I have the param setting correct here because it sounds bad
    params: {
      attack: {
        set: (node, value) => (node.attack.value = value),
        step: 0.01,
        max: 1,
        min: 0,
      },
      ratio: {
        set: (node, value) => (node.ratio.value = value),
        step: 1,
        max: 20,
        min: 1,
      },
      threshold: {
        set: (node, value) => (node.threshold.value = value),
        step: 0.02,
        max: 0,
        min: -100,
      },
      release: {
        set: (node, value) => (node.release.value = value),
        step: 0.02,
        max: 1,
        min: 0,
      },
      knee: {
        set: (node, value) => (node.knee.value = value),
        step: 0.02,
        max: 40,
        min: 0,
      },
    },
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
    <div className="flex flex-wrap w-full justify-around mb-10">
      {EFFECTS.map(({ id, type, params }) => (
        <Effect key={id} id={id} draggable type={type} params={params} />
      ))}
    </div>
  );
}
