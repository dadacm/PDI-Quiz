import { AxiosStatic } from 'axios';

const mockAxios: any = jest.genMockFromModule<AxiosStatic>('axios');

mockAxios.interceptors = mockAxios.interceptors || {};
mockAxios.interceptors.request = mockAxios.interceptors.request || {};
mockAxios.interceptors.request.use = jest.fn();
mockAxios.interceptors.response = mockAxios.interceptors.response || {};
mockAxios.interceptors.response.use = jest.fn();
mockAxios.create = () => mockAxios;

export default mockAxios;
