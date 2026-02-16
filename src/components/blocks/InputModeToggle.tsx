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
    const baseClass = 'p-4 transition-colors';
    const activeClass = 'text-sky-400 border-b-2 border-sky-400';
    const inactiveClass = 'text-gray-500';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClass} ${
      mode === buttonMode ? activeClass : inactiveClass
    } ${disabledClass}`;
  };

  return (
    <div className="flex gap-2 mb-4">
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
  );
}
