export type ArcanaType = 'major' | 'minor';
export type SuitType = 'cups' | 'swords' | 'wands' | 'pentacles' | null;

export interface Card {
  id: string;
  name: string;
  number: number;
  arcana: ArcanaType;
  suit: SuitType;
  img: string;
  keywords: string[];
  gnosticInsight: string;
  cbtPrompt: string;
}