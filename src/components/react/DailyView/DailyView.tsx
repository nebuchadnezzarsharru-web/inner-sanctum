import React, { useState, useEffect } from 'react';
import cardsData from '../../../data/cards.json';
import type { Card } from '../../../types/cards';
import styles from './DailyView.module.css';
import { BirthProfile } from '../BirthProfile/BirthProfile';

export const DailyView: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [todayCard, setTodayCard] = useState<Card>(cardsData[0] as Card);

  useEffect(() => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = (hash << 5) - hash + dateStr.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % cardsData.length;
    setTodayCard(cardsData[index] as Card);
  }, []);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>Daily Calibration</span>
        <h1 className={styles.title}>Synchronize State</h1>
        <p className={styles.subtitle}>
          {isRevealed ? 'Today\'s psychological vector decoded' : 'Tap to decrypt your daily archetype'}
        </p>
      </header>
      <BirthProfile />
      {/* Карточка */}
      <div className={styles.cardContainer} onClick={handleReveal}>
        {!isRevealed ? (
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            <div className={styles.scanLine} />
            <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
              <path d="M12 7v10M7 12h10" strokeWidth="1.5" />
            </svg>
            <span className={styles.promptText}>Initialize Draw</span>
          </div>
        ) : (
          <div className={styles.cardFace}>
            <img
              src={`/cards/${todayCard.img}`}
              alt={todayCard.name}
              className={styles.cardImage}
            />
          </div>
        )}
      </div>

      {isRevealed && <h2 className={styles.cardName}>{todayCard.name}</h2>}

      {/* Контент после вскрытия */}
      {isRevealed && (
        <div className={styles.contentBlock}>
          {/* Gnostic Insight */}
          <div className={styles.insightBox}>
            <p className={styles.insightText}>"{todayCard.gnosticInsight}"</p>
            <div className={styles.keywords}>
              {todayCard.keywords.map((kw, i) => (
                <span key={i} className={styles.tag}>{kw}</span>
              ))}
            </div>
          </div>

          {/* CBT Prompt (читаем и думаем) */}
          <div className={styles.cbtBox}>
            <span className={styles.cbtLabel}>Cognitive Inquiry</span>
            <p className={styles.cbtQuestion}>{todayCard.cbtPrompt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyView;