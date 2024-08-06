import { Help } from '../../types/formTypes';

export type ValidateStatus = 'error' | '';

export const getValidateStatus = (
  errors: unknown,
  touched: unknown,
  submitCount: number
): ValidateStatus => (submitCount && errors && touched ? 'error' : '');

export const getHelp = (errors: unknown, touched: unknown, submitCount: number): Help =>
  submitCount && errors && touched ? (errors as Help) : null;

export const getValidates = (
  errors: unknown,
  touched: unknown,
  submitCount: number
): { validateStatus: ValidateStatus; help: Help } => ({
  validateStatus: getValidateStatus(errors, touched, submitCount),
  help: getHelp(errors, touched, submitCount),
});

export const isNotDefinedString = (string?: string): boolean => !string?.trim();
