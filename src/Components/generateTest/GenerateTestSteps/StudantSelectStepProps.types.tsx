import { Dispatch, SetStateAction } from 'react';
import { FieldValues, FormState, UseFormGetValues, UseFormReset, UseFormSetError } from 'react-hook-form';

export interface StudantSelectStepProps {
  handleNext: () => void;
  checkedStudants: string[];
  handleToggleStudants: (value: string) => void;
  studantNamesarray: string[];
  handleBack: () => void;
  formMethods: {
    getValues: UseFormGetValues<FieldValues>;
    formState: FormState<FieldValues>;
    reset: UseFormReset<FieldValues>;
    setError: UseFormSetError<FieldValues>;
  };
  setCheckedStudants: Dispatch<SetStateAction<string[]>>;
}
