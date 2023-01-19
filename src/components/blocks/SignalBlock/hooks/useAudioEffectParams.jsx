import { useSignalChainStore } from '../../../../stores/SignalChainProvider';
import { definitions } from '../../../../effects/definitions';

export function useAudioEffectParams(id) {
  const { store } = useSignalChainStore();
  const storeEffect = store.find((effect) => effect.id === id);

  const effects = storeEffect?.nodes?.map((node) => {
    console.log(node);
    const { params } = definitions[node.constructor.name];
    return { webAudioNode: node, params };
  });

  return effects;
}
