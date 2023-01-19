import { createDistortionCurve } from './distortion';

export const definitions = {
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
