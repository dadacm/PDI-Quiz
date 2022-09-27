import { Color } from '@material-ui/lab';

export interface TestProps {
  name: string;
  status: 1 | 2 | 3;
  newTest: [
    {
      questionInput: string;
      tema: string;
      alternativeA: string;
      alternativeB: string;
      alternativeC: string;
      alternativeD: string;
      alternativeE: string;
      corectAlternative: string;
    },
  ];
}
export interface TestCardProps {
  test: TestProps;
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
