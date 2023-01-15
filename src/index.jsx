import { render, h } from 'preact';
import initialize from './js/audio';

initialize();

const App = <h1>Hello World!s</h1>;

render(App, document.getElementById('root'));
