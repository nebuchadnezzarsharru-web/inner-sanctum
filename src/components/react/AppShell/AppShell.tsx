import React from 'react';
import { DailyView } from '../DailyView/DailyView';
import styles from './AppShell.module.css';

export const AppShell: React.FC = () => {
  return (
    <div className={styles.shell}>
      <main className={styles.main}>
        <DailyView />
      </main>
    </div>
  );
};

export default AppShell;