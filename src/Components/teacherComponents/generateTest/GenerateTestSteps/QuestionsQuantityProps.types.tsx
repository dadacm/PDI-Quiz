import { Control, FieldValues, FormState, UseFormSetError, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form';

export interface QuestionsQuantityProps {
  tema: string;
  formMethods: {
    control: Control<FieldValues, any>;
    setError: UseFormSetError<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    trigger: UseFormTrigger<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    formState: FormState<FieldValues>;
  };
  handleNext: () => void;
  handleBack: () => void;
}
