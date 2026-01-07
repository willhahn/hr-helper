
export interface Participant {
  id: string;
  name: string;
}

export interface Group {
  id: number;
  members: Participant[];
}

export enum TabType {
  LIST = 'list',
  LUCKY_DRAW = 'lucky-draw',
  GROUPING = 'grouping'
}

export interface DrawHistory {
  timestamp: number;
  winner: string;
}
