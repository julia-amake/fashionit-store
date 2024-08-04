import { AxiosError, isAxiosError } from 'axios';

interface ErrorResponseItem {
  message: string;
}

export interface ErrorResponse {
  errors: ErrorResponseItem[];
}

const DEFAULT_MESSAGE = 'Неизвестная ошибка';

export const getErrorMessage = (
  err: Error | AxiosError<Response>,
  defaultMassage = DEFAULT_MESSAGE
) => (isAxiosError(err) ? err.response?.data.errors[0]?.message || err.message : defaultMassage);

export const errorHandler = <Response = ErrorResponse>(
  err: Error | AxiosError<Response>,
  onError: (err: string) => void,
  defaultMassage = DEFAULT_MESSAGE
) => {
  const message = getErrorMessage(err, defaultMassage);
  return onError(message);
};

export const transformErrorResponse = (response: { data: ErrorResponse; status: number }) =>
  response.data.errors[0].message || response.status;
