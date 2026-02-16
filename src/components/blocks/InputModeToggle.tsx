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
      'flex-1 px-6 py-3 font-medium transition-all duration-200 border-2';
    const activeClass =
      'bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/50';
    const inactiveClass =
      'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750 hover:text-gray-300 hover:border-gray-600';
    const disabledClass = disabled
      ? 'opacity-50 cursor-not-allowed hover:bg-gray-800 hover:text-gray-400 hover:border-gray-700'
      : 'cursor-pointer';

    const firstButton = buttonMode === 'file' ? 'rounded-l-lg' : '';
    const lastButton = buttonMode === 'guitar' ? 'rounded-r-lg' : '';

    return `${baseClass} ${
      mode === buttonMode ? activeClass : inactiveClass
    } ${disabledClass} ${firstButton} ${lastButton}`;
  };

  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        Input Source
      </label>
      <div className="flex">
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
