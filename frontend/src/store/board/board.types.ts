import type { Card } from '../../api/cards/cards.api.ts';

export interface BoardState {
  title: string;
  cards: Card[];
  isLoading: boolean;
  error: string | undefined;
}
