import { FC } from 'react';
import { Keyboard } from './Keyboard';
import * as styles from './App.css';
import { Settings } from './Settings';

export const App: FC = () => (
  <div className={styles.app}>
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Smart Janko Keyboard</h1>
        <Settings />
      </header>
      <Keyboard />
    </div>
  </div>
);
