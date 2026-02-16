import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { signalChainStore } from '../../stores';
import { AUDIOSOURCE } from '../../actions';

type Mode = 'file' | 'guitar';

type Props = {
  disabled?: boolean;
};

export function InputModeToggle({ disabled = false }: Props) {
  const [mode, setMode] = useState<Mode>(
    signalChainStore.getState().audioSource.mode
  );

  useEffect(() => {
    const unsubscribe = signalChainStore.subscribe(() => {
      setMode(signalChainStore.getState().audioSource.mode);
    });
    return unsubscribe;
  }, []);

  const handleSetMode = (newMode: Mode) => {
    if (!disabled) {
      signalChainStore.dispatch({ type: AUDIOSOURCE.SET_MODE, mode: newMode });
    }
  };

  const getButtonClass = (buttonMode: Mode) => {
    const baseClass =
      'flex-1 px-6 py-2.5 font-semibold text-base transition-all duration-200 border-2';
    const activeClass =
      'bg-gradient-to-r from-sky-500 to-sky-400 text-white border-sky-400 shadow-lg shadow-sky-500/50 scale-[1.02]';
    const inactiveClass =
      'bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-600 hover:shadow-md';
    const disabledClass = disabled
      ? 'opacity-50 cursor-not-allowed hover:bg-gray-800/50 hover:text-gray-400 hover:border-gray-700 hover:shadow-none'
      : 'cursor-pointer active:scale-[0.98]';

    const firstButton = buttonMode === 'file' ? 'rounded-l-xl' : '';
    const lastButton = buttonMode === 'guitar' ? 'rounded-r-xl' : '';

    return `${baseClass} ${
      mode === buttonMode ? activeClass : inactiveClass
    } ${disabledClass} ${firstButton} ${lastButton}`;
  };

  return (
    <div>
      <label className="block text-gray-300 text-xs font-semibold mb-2 tracking-wide uppercase">
        Input Source
      </label>
      <div className="flex gap-0.5 bg-gray-950 p-1 rounded-xl">
        <button
          onClick={() => handleSetMode('file')}
          className={getButtonClass('file')}
          disabled={disabled}
        >
          Audio File
        </button>
        <button
          onClick={() => handleSetMode('guitar')}
          className={getButtonClass('guitar')}
          disabled={disabled}
        >
          Guitar Input
        </button>
      </div>
    </div>
  );
}
