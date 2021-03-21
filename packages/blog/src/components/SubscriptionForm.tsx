import React, { useCallback, useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM_ID
const API_KEY = process.env.CONVERTKIT_PUBLIC_KEY

type SubscriptionFormState =
  | {
      status: "idle"
    }
  | {
      status: "submitting"
    }
  | {
      status: "submitted"
    }
  | {
      status: "error"
      message: string
    }

const SubscriptionSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
})

interface SubscriptionSchemaType
  extends Yup.TypeOf<typeof SubscriptionSchema> {}

const INITIAL_VALUES: SubscriptionSchemaType = {
  name: "",
  email: "",
} as SubscriptionSchemaType

export const SubscriptionForm = () => {
  const [state, setState] = useState<SubscriptionFormState>({ status: "idle" })

  const handleSubmit = useCallback(values => {
    const url = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

    const body = JSON.stringify({
      ...values,
      api_key: API_KEY,
    })

    setState({ status: "submitting" })

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then(response => response.json())
      .then(() => {
        setState({ status: "submitted" })
      })
      .catch(() => {
        setState({ status: "error", message: `Something went wrong` })
      })
  }, [])

  if (!FORM_ID) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_SIGNUP_FORM_ID`)
  }

  if (!API_KEY) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_PUBLIC_KEY`)
  }

  if (state.status === "idle") {
    return (
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={SubscriptionSchema}
      >
        <Form className="form">
          <label htmlFor="name">
            <div className="form-message">
              First Name
              <ErrorMessage
                className="form-error-message"
                component="span"
                name="name"
              />
            </div>
            <Field
              aria-label="your first name"
              aria-required="true"
              className="form-field"
              component="input"
              name="name"
              placeholder="Jane"
            />
          </label>
          <label htmlFor="email">
            <div className="form-message">
              Email
              <ErrorMessage
                className="form-error-message"
                component="span"
                name="email"
              />
            </div>
            <Field
              aria-label="your email address"
              aria-required="true"
              className="form-field"
              component="input"
              name="email"
              placeholder="jane@company.com"
            />
          </label>

          <button className="form-submit" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    )
  }

  if (state.status === "submitting") {
    return (
      <div className="form-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  if (state.status === "submitted") {
    return (
      <div className="form-submitted">
        Thanks! Please check your inbox to confirm your subscription!
      </div>
    )
  }

  return <div className="form-error">{state.message}</div>
}
