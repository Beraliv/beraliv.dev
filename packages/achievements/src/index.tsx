import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import 'solid-devtools';

import { Achievements } from './Achievements';
import { Random } from './Random';
import { SudokuBoard } from './widgets/SudokuBoard';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const App = () => (
  <Router>
    <Route path="/" component={() => (
      <>
        <Achievements />
        <Random />
      </>
    )} />
    <Route path="/sudoku" component={() => <SudokuBoard />} />
  </Router>
);

render(() => <App />, root!);
