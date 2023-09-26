export type TodoItem = {
  id: number;
  text: string;
  dateTime: Date;
  completed: boolean;
  color: string;
};

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
