export interface Evaluation {
  id: number;
  stream?: string;
  communication?: string;
  learnAbility?: string;
  direction?: string;
  evaluation: number;
  comment?: string;
  active: boolean;
}
