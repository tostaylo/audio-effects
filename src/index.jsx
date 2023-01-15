import { render, h } from 'preact';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignalChain } from './components/SignalChain';
import { EffectList } from './components/EffectList';
import initialize from './js/audio';

initialize();

const App = (
  <DndProvider backend={HTML5Backend}>
    <EffectList />
    <SignalChain />
  </DndProvider>
);

render(App, document.getElementById('root'));
