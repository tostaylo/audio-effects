import { createDistortionCurve } from './distortion';

type ParamDefinition = {
  // eslint-disable-next-line no-unused-vars
  set?: (node: any, value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  type?: string[];
};

type NodeDefinition = {
  params: {
    [key: string]: ParamDefinition;
  };
};

export type Definitions = {
  [key: string]: NodeDefinition;
};

export const definitions: Definitions = {
  BiquadFilterNode: {
    params: {
      Q: {
        set: (node, value) => (node.Q.value = value),
        step: 1000,
        min: -3.4028234663852886e38,
        max: 3.4028234663852886e38,
      },
      frequency: {
        set: (node, value) => (node.frequency.value = value),
        step: 1000,
        min: 0,
        max: 24000,
      },
      detune: {
        set: (node, value) => (node.detune.value = value),
        step: 1000,
        min: -153600,
        max: 153600,
      },
    },
  },
  GainNode: {
    params: {
      gain: {
        set: (node, value) => (node.gain.value = value),
        step: 0.02,
        max: 100,
        min: 0,
      },
    },
  },
  DelayNode: {
    params: {
      delayTime: {
        set: (node, value) => (node.delayTime.value = value),
        step: 0.02,
        max: 1,
        min: 0,
      },
    },
  },
  DynamicsCompressorNode: {
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
  OscillatorNode: {
    params: {
      type: {
        type: ['sine', 'square', 'sawtooth', 'triangle'],
      },
      detune: {
        set: (node, value) => (node.detune.value = value),
        step: 1,
        min: 0,
        max: 500,
      },
      frequency: {
        set: (node, value) => (node.frequency.value = value),
        step: 0.01,
        min: 0,
        max: 6000,
      },
    },
  },
  WaveShaperNode: {
    params: {
      curve: {
        set: (node, value) => (node.curve = createDistortionCurve(value * 5)),
        step: 1,
        max: 100,
        min: 0,
      },
    },
  },
};
