import { Color } from '@material-ui/lab';
import { QuestionAnswered } from '../studantComponents/testModal/TestModal.types';

export interface Questions {
  answer?: string;
  questionInput: string;
  tema: string;
  alternativeA: string;
  alternativeB: string;
  alternativeC: string;
  alternativeD: string;
  alternativeE: string;
  corectAlternative: string;
  id: number;
}

export interface AnsweredQuestion extends Questions {
  answer: string;
}
export interface TestProps {
  name: string;
  status: 1 | 2 | 3;
  newTest: Questions[];
  nota?: number;
  id: number;
}
export interface TestCardProps {
  test: TestProps;
  isTeacher?: boolean;
  testStartButton?: boolean;
}
export enum StatusTest {
  EM_ABERTO = 1,
  EM_ANDAMENTO = 2,
  CONCLUIDO = 3,
}
export interface StatusProps {
  text: string;
  color: Color;
}
export interface RenderStatusProps {
  [StatusTest.EM_ABERTO]: StatusProps;
  [StatusTest.EM_ANDAMENTO]: StatusProps;
  [StatusTest.CONCLUIDO]: StatusProps;
}
