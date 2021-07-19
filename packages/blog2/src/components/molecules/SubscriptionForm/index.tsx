import React, { useCallback, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./index.module.css";
import { Loader } from "../../atoms/Loader";
import { validateNever } from "../../../validators/validateNever";

const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM_ID;
const API_KEY = process.env.CONVERTKIT_PUBLIC_KEY;

type SubscriptionFormState =
  | {
      status: "idle";
    }
  | {
      status: "submitting";
    }
  | {
      status: "submitted";
    }
  | {
      status: "error";
      message: string;
    };

const SubscriptionSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

interface SubscriptionSchemaType
  extends Yup.TypeOf<typeof SubscriptionSchema> {}

const INITIAL_VALUES: SubscriptionSchemaType = {
  name: "",
  email: "",
} as SubscriptionSchemaType;

export const SubscriptionForm = () => {
  const [state, setState] = useState<SubscriptionFormState>({ status: "idle" });

  const handleSubmit = useCallback((values) => {
    const url = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

    const body = JSON.stringify({
      ...values,
      api_key: API_KEY,
    });

    setState({ status: "submitting" });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then(() => {
        setState({ status: "submitted" });
      })
      .catch(() => {
        setState({ status: "error", message: `Something went wrong` });
      });
  }, []);

  if (!FORM_ID) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_SIGNUP_FORM_ID`);
  }

  if (!API_KEY) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_PUBLIC_KEY`);
  }

  if (state.status === "idle") {
    return (
      <>
        <h3>Let&#39;s chat and have fun 🧑‍💻👩‍💻</h3>
        <p>
          No more often than once a week I write 📄 about TypeScript 💪, video
          playback 📺 and frontend related topics. You can unsubscribe in any
          time ↘️
        </p>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={SubscriptionSchema}
        >
          <Form className={styles.form}>
            <label htmlFor="name">
              <div className={styles.label}>
                First Name
                <ErrorMessage
                  className={styles.errorMessage}
                  component="span"
                  name="name"
                />
              </div>
              <Field
                aria-label="your first name"
                aria-required="true"
                className={styles.field}
                component="input"
                name="name"
                placeholder="Jane"
              />
            </label>
            <label htmlFor="email">
              <div className={styles.label}>
                Email
                <ErrorMessage
                  className={styles.errorMessage}
                  component="span"
                  name="email"
                />
              </div>
              <Field
                aria-label="your email address"
                aria-required="true"
                className={styles.field}
                component="input"
                name="email"
                placeholder="jane@company.com"
              />
            </label>

            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      </>
    );
  }

  if (state.status === "submitting") {
    return (
      <div className={styles.submitting}>
        <Loader />
      </div>
    );
  }

  if (state.status === "submitted") {
    return (
      <div className={styles.submitted}>
        Thanks! Please check your inbox to confirm your subscription!
      </div>
    );
  }

  if (state.status === "error") {
    return <div className={styles.error}>{state.message}</div>;
  }

  validateNever(state);
  return null;
};
