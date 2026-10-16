import React, { useState, useEffect } from 'react';
import Picker from 'react-mobile-picker';
import styles from './BirthProfile.module.css';

const STORAGE_KEY = 'sanctum_birth_profile';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const years = Array.from({ length: 80 }, (_, i) => String(2026 - i));
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

export interface BirthProfileData {
  day: string;
  month: string;
  year: string;
  hour?: string;
  minute?: string;
  hasTime: boolean;
}

export const BirthProfile: React.FC = () => {
  const [dateValue, setDateValue] = useState({ day: '15', month: 'Jun', year: '1995' });
  const [timeValue, setTimeValue] = useState({ hour: '12', minute: '00' });
  const [includeTime, setIncludeTime] = useState(false);
  const [savedProfile, setSavedProfile] = useState<BirthProfileData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedProfile(parsed);
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }
  }, []);

  const handleSave = () => {
    const profileData: BirthProfileData = {
      ...dateValue,
      ...(includeTime ? timeValue : {}),
      hasTime: includeTime,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
    setSavedProfile(profileData);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedProfile(null);
  };

  // Если профиль уже зафиксирован — показываем строгую карточку паспорта
  if (savedProfile) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Natal Matrix Locked</span>
          <button className={styles.editBtn} onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.lockedDisplay}>
          <div className={styles.lockedItem}>
            <span className={styles.lockedLabel}>Birth Date</span>
            <span className={styles.lockedValue}>
              {savedProfile.day} {savedProfile.month} {savedProfile.year}
            </span>
          </div>
          {savedProfile.hasTime && (
            <div className={styles.lockedItem}>
              <span className={styles.lockedLabel}>Time</span>
              <span className={styles.lockedValue}>{savedProfile.hour}:{savedProfile.minute}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Форма ввода с растянутыми на всю ширину барабанами
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>Temporal Alignment</span>
        <h2 className={styles.title}>Natal Origin</h2>
      </header>

      {/* Дата рождения */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Date of Birth</span>
        <div className={styles.pickerWrapper}>
          <Picker
            value={dateValue}
            onChange={setDateValue}
            wheelMode="natural"
            height={130}
            itemHeight={40}
          >
            <Picker.Column name="day">
              {days.map((d) => (
                <Picker.Item key={d} value={d}>
                  {({ selected }) => <span className={selected ? styles.itemSelected : styles.item}>{d}</span>}
                </Picker.Item>
              ))}
            </Picker.Column>

            <Picker.Column name="month">
              {MONTHS.map((m) => (
                <Picker.Item key={m} value={m}>
                  {({ selected }) => <span className={selected ? styles.itemSelected : styles.item}>{m}</span>}
                </Picker.Item>
              ))}
            </Picker.Column>

            <Picker.Column name="year">
              {years.map((y) => (
                <Picker.Item key={y} value={y}>
                  {({ selected }) => <span className={selected ? styles.itemSelected : styles.item}>{y}</span>}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      </div>

      {/* Переключатель времени */}
      <div className={styles.toggleRow}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={includeTime}
            onChange={(e) => setIncludeTime(e.target.checked)}
            className={styles.checkbox}
          />
          <span>Specify Exact Time</span>
        </label>
      </div>

      {/* Время рождения */}
      {includeTime && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Time of Birth</span>
          <div className={styles.pickerWrapper}>
            <Picker
              value={timeValue}
              onChange={setTimeValue}
              wheelMode="natural"
              height={130}
              itemHeight={40}
            >
              <Picker.Column name="hour">
                {hours.map((h) => (
                  <Picker.Item key={h} value={h}>
                    {({ selected }) => <span className={selected ? styles.itemSelected : styles.item}>{h}</span>}
                  </Picker.Item>
                ))}
              </Picker.Column>

              <Picker.Column name="minute">
                {minutes.map((m) => (
                  <Picker.Item key={m} value={m}>
                    {({ selected }) => <span className={selected ? styles.itemSelected : styles.item}>{m}</span>}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </div>
        </div>
      )}

      <button className={styles.primaryBtn} onClick={handleSave}>
        Lock Coordinates
      </button>
    </div>
  );
};

export default BirthProfile;