import { useSignalChainStore } from '../../../../stores/SignalChainProvider';
import { definitions } from '../../../../effects/definitions';

export function useAudioEffectParams(id) {
  const { store } = useSignalChainStore();
  const storeEffect = store.find((effect) => effect.id === id);

  const effects = storeEffect?.nodes
    ?.map((node) => {
      const effectDefinition = definitions[node.constructor.name];

      if (!effectDefinition) return false;

      const { params } = effectDefinition;

      return { webAudioNode: node, params };
    })
    .filter(Boolean);

  return effects;
}
