export interface Player {
    name: string;
    vote: number;
    uuid: string;
    position: number;
  }

  export interface ChangePositionMessage {
    targetPosition: number;
    player: Player;
  }
