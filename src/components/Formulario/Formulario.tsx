// External deps
import React from "react";
import { CardContent, Card, Container, Box } from "@material-ui/core";
import { Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { mixed, number, object } from "yup";

// Internal deps
import useStyles from "./FormularioStyle";
import FormikStepper from "../FormikStepper/FormikStepper";
import FormikStep from "../FormikStep/FormikStep";

const Formulario = () => {
  const classes = useStyles();

  const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));
  return (
    <Container maxWidth={"sm"}>
      <Card className={classes.card}>
        <CardContent>
          <FormikStepper
            initialValues={{
              firstName: "",
              lastName: "",
              millionarie: false,
              money: 0,
              description: "",
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              console.log("values", values);
            }}
          >
            {/* 1er Step */}
            <FormikStep
              label={"Personal Data"}
              validationSchema={object({
                firstName: mixed().required("This filed is required"),
                lastName: mixed().required("This filed is required"),
              })}
            >
              <Box className={classes.box}>
                <Field
                  fullWidth
                  name="firstName"
                  component={TextField}
                  label="First Name"
                />
              </Box>
              <Box className={classes.box}>
                <Field
                  fullWidth
                  name="lastName"
                  component={TextField}
                  label="Last Name"
                />
              </Box>
              <Box className={classes.box}>
                <Field
                  name="millionarie"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  Label={{ label: "I am a millionarie" }}
                />
              </Box>
            </FormikStep>

            {/* 2do Step */}
            <FormikStep
              label={"Bank Accounts"}
              validationSchema={object({
                money: mixed().when("millionarie", {
                  is: true,
                  then: number()
                    .required()
                    .min(1000000, "Because you said you're a millionarie"),
                  otherwise: number().required().moreThan(0),
                }),
              })}
            >
              <Box className={classes.box}>
                <Field
                  fullWidth
                  name="money"
                  type="number"
                  component={TextField}
                  label="All the money I have"
                />
              </Box>
            </FormikStep>

            {/* 3er Step */}
            <FormikStep label={"More Info"}>
              <Box className={classes.box}>
                <Field
                  fullWidth
                  name="description"
                  component={TextField}
                  label="Description"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Formulario;
