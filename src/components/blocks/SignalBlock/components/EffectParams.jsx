import { h } from 'preact';
import { useAudioEffectParams } from '../hooks/useAudioEffectParams';

export function EffectParams({ id }) {
  const effects = useAudioEffectParams(id);

  return effects?.map((effect, idx) => (
    <div key={idx} className="flex flex-col">
      {Object.entries(effect.params)?.map(([key, { set, min, max, step }]) => {
        const currentVal = effect.webAudioNode[key].value;

        return (
          <label className="flex justify-between" key={key} htmlFor={key}>
            <input
              onInput={(event) => {
                set(effect.webAudioNode, Number(event.target.value));
              }}
              defaultValue={currentVal}
              type="range"
              id={key}
              name={key}
              min={min}
              max={max}
              step={step}
            />
            {key}
          </label>
        );
      })}
    </div>
  ));
}
