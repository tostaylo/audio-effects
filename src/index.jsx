import { render, h } from 'preact';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Basket } from './components/Basket';
import initialize from './js/audio';

initialize();

const App = (
  <DndProvider backend={HTML5Backend}>
    <Basket />
  </DndProvider>
);

render(App, document.getElementById('root'));
