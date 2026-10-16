import React, { useRef, useEffect } from 'react';
import styles from './WheelPicker.module.css';

interface WheelPickerProps {
  options: { label: string; value: number | string }[];
  value: number | string;
  onChange: (value: number | string) => void;
  label?: string;
}

export const WheelPicker: React.FC<WheelPickerProps> = ({ options, value, onChange, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ITEM_HEIGHT = 40; // Высота одной ячейки в px

  // Прокрутка к выбранному значению при изменении value извне
  useEffect(() => {
    const index = options.findIndex((opt) => opt.value === value);
    if (index !== -1 && containerRef.current) {
      containerRef.current.scrollTop = index * ITEM_HEIGHT;
    }
  }, [value, options]);

  // Хэндлер скролла для определения выбранного элемента
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const selectedIndex = Math.round(scrollTop / ITEM_HEIGHT);
    if (options[selectedIndex] && options[selectedIndex].value !== value) {
      onChange(options[selectedIndex].value);
    }
  };

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.pickerLabel}>{label}</span>}
      <div className={styles.pickerContainer}>
        {/* Неоновая рамка-фокус по центру */}
        <div className={styles.selectionOverlay} />

        {/* Градиентное затемнение сверху и снизу */}
        <div className={styles.fadeOverlay} />

        <div
          ref={containerRef}
          className={styles.scrollList}
          onScroll={handleScroll}
        >
          {/* Пустой отступ сверху для центрирования первого элемента */}
          <div className={styles.paddingItem} />

          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                className={`${styles.item} ${isSelected ? styles.selected : ''}`}
                onClick={() => onChange(opt.value)}
              >
                {opt.label}
              </div>
            );
          })}

          {/* Пустой отступ снизу для центрирования последнего элемента */}
          <div className={styles.paddingItem} />
        </div>
      </div>
    </div>
  );
};