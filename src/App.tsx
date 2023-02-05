import { FC } from 'react';
import { Keyboard } from './Keyboard';
import * as styles from './App.css';
import { Settings } from './Settings';

export const App: FC = () => (
  <div className={styles.app}>
    <Settings />
    <Keyboard />
  </div>
);
