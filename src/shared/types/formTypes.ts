import { FormikContextType } from 'formik/dist';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager?: FormikContextType<Values>;
}
