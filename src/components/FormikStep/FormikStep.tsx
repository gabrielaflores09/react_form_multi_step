// External deps
import React from "react";
import { FormikConfig, FormikValues } from "formik";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

const FormikStep = ({ children }: FormikStepProps) => {
  return <>{children}</>;
};
export default FormikStep;
