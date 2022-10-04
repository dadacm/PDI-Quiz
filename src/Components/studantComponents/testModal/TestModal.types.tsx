import { TestProps } from '../../testCard/TestCard.types';

export interface TestModalProps {
  open: boolean;
  handleOpen: any;
  handleClose: any;
  formMethods?: any;
  questions: TestProps;
}

export interface QuestionAnswered {
  answer: string;
  questionInput: string;
  tema: string;
  alternativeA: string;
  alternativeB: string;
  alternativeC: string;
  alternativeD: string;
  alternativeE: string;
  corectAlternative: string;
}
export enum Alternatives {
  'A' = 0,
  'B' = 1,
  'C' = 2,
  'D' = 3,
  'E' = 4,
}
