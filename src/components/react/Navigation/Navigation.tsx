import React from 'react';
import styles from './Navigation.module.css';

export type TabType = 'daily' | 'cards' | 'journal';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className={styles.nav}>
      <button
        className={`${styles.tab} ${activeTab === 'daily' ? styles.tabActive : ''}`}
        onClick={() => onSelectTab('daily')}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
          <path d="M12 3v18M3 12h18" strokeWidth="1.75" />
        </svg>
        <span>Today</span>
      </button>

      <button
        className={`${styles.tab} ${activeTab === 'cards' ? styles.tabActive : ''}`}
        onClick={() => onSelectTab('cards')}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="5" y="3" width="14" height="18" rx="2" strokeWidth="1.75" />
          <path d="M9 7h6M9 11h6" strokeWidth="1.75" />
        </svg>
        <span>Cards</span>
      </button>

      <button
        className={`${styles.tab} ${activeTab === 'journal' ? styles.tabActive : ''}`}
        onClick={() => onSelectTab('journal')}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="1.75" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="1.75" />
        </svg>
        <span>Sanctum</span>
      </button>
    </nav>
  );
};