import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { waveformVisualizer } from './visualizer.js';

export function Visualizer({ analyser }) {
  useEffect(() => {
    waveformVisualizer(analyser);
  }, []);

  return <canvas className="w-[320px]" id="visualizer"></canvas>;
}
