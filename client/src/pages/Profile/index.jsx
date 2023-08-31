import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import useAsync from "../../hooks/useAsync"
import Spinner from "../../components/spinner"
import { useAuth } from "../../provider/authProvider"
import upDateUser from "../../services/updateUserprofile"
import { updateValidationSchema } from "../../validationSchema/registerValiodation"
import toastError from "../../components/toast/error"
import toastSuccess from "../../components/toast/success"

export default function Profile() {
  const [loading, execute, error] = useAsync()
  const { user, token, setToken, logout } = useAuth()
  const navigate = useNavigate()

  const initialValues = {
    firstName: user.name,
    lastName: user.lastName,
    email: user.email,
    oldPassword: "",
    password: "",
  }

  const handleSubmit = async (values) => {
    const response = await execute(upDateUser, values, user._id, token)
    if (response) {
      if (response === "Profile updated. Please activate changed emial") {
        logout()
        navigate("/login", { replace: true })
        toastSuccess(
          "Profile Updated! Please activate your changed email and login again"
        )
      } else {
        setToken(response)
        toastSuccess("Profile Updated!")
      }
    } else if (error) toastError(error)
  }
  return (
    <>
      <div className="sigup-login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={updateValidationSchema}
          onSubmit={handleSubmit}
        >
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
                  name="oldPassword"
                  placeholder="Old Password"
                />
                <ErrorMessage
                  className="text-warning"
                  name="oldPassword"
                  component="div"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <Field
                  type="password"
                  className="input form-control"
                  name="password"
                  placeholder="New Password"
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
              {loading ? <Spinner /> : "Update"}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  )
}
