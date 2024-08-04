import { MutableRefObject, ReactNode } from 'react';
import { FormikContextType } from 'formik/dist';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager?: FormikContextType<Values>;
  formElement?: MutableRefObject<HTMLFormElement>;
  autoFocusElement?: MutableRefObject<HTMLInputElement>;
}

export type Help = null | ReactNode;
