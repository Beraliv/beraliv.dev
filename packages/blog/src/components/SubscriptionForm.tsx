import React, { useCallback, useState } from "react"
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
      data: Record<string, unknown>
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
    console.log(`>>> handleSubmit`, values)

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
      .then(data => {
        setState({ status: "submitted", data })
        console.log(`>>> fetch, data`, data)
      })
      .catch(error => {
        setState({ status: "error", message: `Something went wrong` })
        console.log(`>>> fetch, error`, error)
      })
  }, [])

  if (!FORM_ID) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_SIGNUP_FORM_ID`)
  }

  if (!API_KEY) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_PUBLIC_KEY`)
  }

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
            <ErrorMessage name="name" component="span" className="form-error" />
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
              className="form-error"
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
