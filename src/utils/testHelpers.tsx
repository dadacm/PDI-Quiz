import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ThemeConsumer } from 'styled-components';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { theme } from '@agilize/components-core';
import { AxiosStatic } from 'axios';
import { useForm, FormProvider } from 'react-hook-form';

export const noop = () => {};
export const buildSpy = () => jest.fn();

// eslint-disable-next-line global-require
export const mockAxios: jest.Mocked<AxiosStatic> = require('axios').default;

export const renderWithTheme = (children: React.ReactNode) => {
  (ThemeConsumer as any)._currentValue = theme;
  return render(<div>{children}</div>);
};

export const renderWithRoute = (ui: React.ReactElement, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) => {
  (ThemeConsumer as any)._currentValue = theme;
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }: any) {
    return <HistoryRouter history={history}>{children}</HistoryRouter>;
  }
  return {
    // @ts-ignore
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};

export const ensureRender = async () => {
  await act(() => Promise.resolve());
};

export const renderWithFormProvider = (ui: any, defaultValues?: any) => {
  (ThemeConsumer as any)._currentValue = theme;
  function Wrapper({ children }: any): any {
    const methods = useForm({ defaultValues: defaultValues || {} });
    const handleSubmit = () => {};
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
      </FormProvider>
    );
  }
  return {
    // @ts-ignore
    ...render(ui, { wrapper: Wrapper }),
  };
};

export const renderWithFormNextProvider = (ui: any, defaultValues?: any) => {
  (ThemeConsumer as any)._currentValue = theme;
  function Wrapper({ children }: any) {
    const methods = useForm({ defaultValues: defaultValues || {} });
    const handleSubmit = () => {};
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
      </FormProvider>
    );
  }
  return {
    // @ts-ignore
    ...render(ui, { wrapper: Wrapper }),
  };
};

export const renderWithCallbackFormMethods = (defaultValues: any, callbackComponent: any) => {
  (ThemeConsumer as any)._currentValue = theme;

  function Wrapper() {
    const handleSubmit = () => {};
    const formMethods = useForm({ mode: 'onChange', defaultValues });

    return (
      <FormProvider {...formMethods}>
        <form data-testid="form-test-helper" onSubmit={formMethods.handleSubmit(handleSubmit)}>
          {callbackComponent(formMethods)}
        </form>
      </FormProvider>
    );
  }

  return {
    ...render(<Wrapper />),
  };
};

export const renderWithCallbackFormNextMethods = (defaultValues: any, callbackComponent: any) => {
  (ThemeConsumer as any)._currentValue = theme;

  function Wrapper() {
    const handleSubmit = () => {};
    const formMethods = useForm({ mode: 'onChange', defaultValues });

    return (
      <FormProvider {...formMethods}>
        <form data-testid="form-test-helper" onSubmit={formMethods.handleSubmit(handleSubmit)}>
          {callbackComponent(formMethods)}
        </form>
      </FormProvider>
    );
  }

  return {
    ...render(<Wrapper />),
  };
};
