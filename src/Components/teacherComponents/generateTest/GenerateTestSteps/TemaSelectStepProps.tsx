export interface TemaSelectStepProps {
  handleNext: () => void;
  tema: string;
  setTema: (value: string) => void;
  arrayTemas: string[];
}
