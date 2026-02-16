import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useAudioEffectParams } from '../hooks/useAudioEffectParams';

type ParamConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (_node: any, _value: number) => void;
  min: number;
  max: number;
  step: number;
};

function formatAudioParam(value: number): string {
  const absValue = Math.abs(value);

  // For large values (>= 1000), show without decimals
  if (absValue >= 1000) {
    return value.toFixed(0);
  }

  // For medium values (1-1000), show with up to 2 decimals
  if (absValue >= 1) {
    return value
      .toFixed(2)
      .replace(/(\.\d*?)0+$/, '$1')
      .replace(/\.$/, '');
  }

  // For small values (< 1), show with up to 3 decimals, removing trailing zeros
  return value
    .toFixed(3)
    .replace(/(\.\d*?)0+$/, '$1')
    .replace(/\.$/, '');
}

type EffectParamsProps = {
  id: string;
};

export function EffectParams({ id }: EffectParamsProps) {
  const effects = useAudioEffectParams(id);

  if (!effects || effects.length === 0) return null;

  return (
    <div className="w-full mb-4 space-y-3">
      {effects?.map((effect, idx) => (
        <div
          key={idx}
          className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-lg p-2 space-y-3"
        >
          {Object.entries(effect.params)?.map(([key, paramConfig]) => {
            const { set, min, max, step } = paramConfig as ParamConfig;
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
                          {formatAudioParam(currentVal ?? 0)}
                        </span>
                      </div>
                      <input
                        onInput={(event) => {
                          const target = event.target as HTMLInputElement;
                          const newValue = Number(target.value);
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
                        <span>{formatAudioParam(min ?? 0)}</span>
                        <span>{formatAudioParam(max ?? 0)}</span>
                      </div>
                    </label>
                  </div>
                )
              );
            };

            return <ParamControl key={key} />;
          })}
        </div>
      ))}
    </div>
  );
}
