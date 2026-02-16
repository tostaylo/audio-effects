import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useAudioEffectParams } from '../hooks/useAudioEffectParams';

export function EffectParams({ id }) {
  const effects = useAudioEffectParams(id);

  if (!effects || effects.length === 0) return null;

  return (
    <div className="w-full mb-4 space-y-3">
      {effects?.map((effect, idx) => (
        <div
          key={idx}
          className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-lg p-2 space-y-3"
        >
          {Object.entries(effect.params)?.map(
            ([key, { set, min, max, step }]) => {
              const ParamControl = () => {
                const [currentVal, setCurrentVal] = useState(
                  effect.webAudioNode[key].value
                );

                return (
                  key.toLowerCase() !== 'q' && (
                    <div className="bg-gray-800/80 border border-gray-600 rounded-md p-3">
                      <label className="flex flex-col space-y-2" htmlFor={key}>
                        <div className="flex justify-between items-center">
                          <span className="text-sky-400 text-xs font-semibold uppercase tracking-wide">
                            {key}
                          </span>
                          <span className="text-gray-300 text-xs font-mono bg-gray-700 px-2 py-1 rounded">
                            {currentVal?.toPrecision(3)}
                          </span>
                        </div>
                        <input
                          onInput={(event) => {
                            const newValue = Number(event.target.value);
                            set(effect.webAudioNode, newValue);
                            setCurrentVal(newValue);
                          }}
                          value={currentVal}
                          type="range"
                          id={key}
                          name={key}
                          min={min}
                          max={max}
                          step={step}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 font-mono">
                          <span>{Number(min ?? 0).toPrecision(3)}</span>
                          <span>{Number(max ?? 0).toPrecision(3)}</span>
                        </div>
                      </label>
                    </div>
                  )
                );
              };

              return <ParamControl key={key} />;
            }
          )}
        </div>
      ))}
    </div>
  );
}
