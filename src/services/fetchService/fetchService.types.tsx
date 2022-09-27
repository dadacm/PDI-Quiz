import React, { SetStateAction } from 'react';

export interface fetchServiceProps {
  setData?: React.Dispatch<SetStateAction<{}>>;
  url: string;
  payload?: {};
  onSuccess?: (res: {}) => any;
  setIsLoading?: React.Dispatch<SetStateAction<boolean>>;
}
