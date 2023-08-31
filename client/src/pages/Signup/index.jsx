import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import useAsync from "../../hooks/useAsync"
import registerUser from "../../services/registerUser"
import Spinner from "../../components/spinner"
import { registerValidationSchema } from "../../validationSchema/registerValiodation"
import toastSuccess from "../../components/toast/success"
import toastError from "../../components/toast/error"

export default function Signup() {
  const [loading, execute, error] = useAsync()
  const navigate = useNavigate()

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }
  const handleSubmit = async (values) => {
    const response = await execute(registerUser, values)
    if (response) {
      navigate("/login", { replace: true })
      toastSuccess("Registered successfully! Please activate your email")
    } else if (error) toastError(error)
  }

  return (
    <>
      <div className="sigup-login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="bg-dark border-bottom border-bottom-dark p-5 w-75 rounded">
              <div className="row mb-3">
                <div className="col">
                  <Field
                    type="text"
                    className="input form-control"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    className="text-warning"
                    name="firstName"
                    component="div"
                  />
                </div>
                <div className="col">
                  <Field
                    type="text"
                    className="input form-control"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    className="text-warning"
                    name="lastName"
                    component="div"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <Field
                    type="email"
                    className="input form-control"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    className="text-warning"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="col">
                  <Field
                    type="password"
                    className="input form-control"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    className="text-warning"
                    name="password"
                    component="div"
                  />
                </div>
              </div>
              {error && <div className="text-warning">{error}</div>}
              <button className="btn btn-primary" type="submit">
                {loading ? <Spinner /> : "Signup"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
