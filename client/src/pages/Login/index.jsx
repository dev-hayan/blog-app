import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import loginValidationSchema from "../../validationSchema/loginValidation"
import { useAuth } from "../../provider/authProvider"
import { useNavigate } from "react-router-dom"
import useAsync from "../../hooks/useAsync"
import loginUser from "../../services/loginUser"
import Spinner from "../../components/spinner"
import toastError from "../../components/toast/error"
import toastSuccess from "../../components/toast/success"

export default function Login() {
  const { setToken } = useAuth()
  const [loading, execute, error] = useAsync()
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: "",
  }
  const handleSubmit = async (values) => {
    try {
      const response = await execute(loginUser, values)
      if (response) {
        setToken(response)
        navigate("/", { replace: true })
        toastSuccess("Login successfully")
      }
    } catch (error) {
      toastError(error)
    }
  }
  return (
    <>
      <div className="sigup-login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-dark border-bottom border-bottom-dark p-5 w-75 rounded">
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
              </div>
              <div className="mb-3">
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
              {error && <div className="text-warning">{error}</div>}
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
