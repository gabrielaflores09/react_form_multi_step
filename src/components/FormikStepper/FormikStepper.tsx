// External deps
import React, { ReactElement, useState } from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CircularProgress,
} from "@material-ui/core";

// Internal deps
import useStyles from "./FormikStepperStyle";
import { FormikStepProps } from "../FormikStep/FormikStep";

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(children) as ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as ReactElement<FormikStepProps>;
  const [completed, setCompleted] = useState(false);

  const classes = useStyles();
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values: any, helpers: any) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete={"off"}>
          <Stepper
            alternativeLabel
            activeStep={step}
            className={classes.stepper}
          >
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          <Grid container spacing={1} justify="center">
            <Grid item>
              {step ? (
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                  className={classes.btn}
                >
                  Back
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
                className={classes.btn}
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default FormikStepper;
