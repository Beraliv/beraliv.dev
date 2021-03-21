import React, { useCallback } from "react"
import { Form, Field } from "react-final-form"

const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM
const API_KEY = process.env.CONVERTKIT_PUBLIC_KEY

export const SubscriptionForm = () => {
  const handleSubmit = useCallback(values => {
    const url = `https://api.convertkit.com//v3/forms/${FORM_ID}/subscribe`

    const body = JSON.stringify({
      ...values,
      api_key: API_KEY,
    })

    fetch(url, {
      method: "POST",
      body,
    })
      .then(response => {
        console.log(`>>> submit with response`, response)
      })
      .catch(error => {
        console.log(`>>> error`, error)
      })
  }, [])

  const render = useCallback(
    ({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name</label>
          <Field
            name="name"
            component="input"
            placeholder="Jane"
            aria-label="your first name"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <Field
            name="email"
            component="input"
            placeholder="jane@company.com"
            aria-label="your email address"
            aria-required="true"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    ),
    []
  )

  if (!FORM_ID) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_SIGNUP_FORM`)
  }

  if (!API_KEY) {
    console.warn(`[SubscriptionForm]: CANNOT_FIND_CONVERTKIT_PUBLIC_KEY`)
  }

  return <Form onSubmit={handleSubmit} render={render} />
}
