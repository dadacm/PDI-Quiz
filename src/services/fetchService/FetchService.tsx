import { useState } from 'react';
import { InstanceAxios } from '../../utils/Axios/instanceAxios';
import { fetchServiceProps } from './fetchService.types';

export const fetchService = {
  get: async (props: fetchServiceProps) => {
    const { setData, url, onSuccess, setIsLoading } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }
    InstanceAxios.get(url).then(res => {
      if (setData) {
        setData(res.data.data);
      }
      if (onSuccess) {
        onSuccess(res);
      }
      if (setIsLoading) {
        return setIsLoading(false);
      }
    });
  },

  post: async (props: fetchServiceProps) => {
    const { setData, url, payload, onSuccess, setIsLoading } = props;

    if (setIsLoading) {
      setIsLoading(true);
    }
    InstanceAxios.post(url, payload).then(res => {
      if (setData) {
        setData(res.data.data);
      }
      if (onSuccess) {
        onSuccess(res);
      }
      if (setIsLoading) {
        return setIsLoading(false);
      }
    });
  },
};
