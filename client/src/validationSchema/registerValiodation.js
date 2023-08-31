/* eslint-disable no-useless-escape */
import * as Yup from "yup"

export const registerValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    firstName: Yup.string().min(3, 'firstname must be three chracters long').max(20, 'firstname must be three chracters long').required('firstname is required'),
    lastName: Yup.string().min(3, 'lastname must be three chracters long').max(20, 'lastname must be three chracters long').required('lastname is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(128, 'Password must be no more than 128 characters long')
        .matches(/[a-zA-Z0-9_]+/, 'Password must only contain letters, numbers, and underscores')
        .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]+/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?/'"/\\|~`\-]/, 'Must contain at least one special character'),
});

export const updateValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    firstName: Yup.string().min(3, 'firstname must be three chracters long').max(20, 'firstname must be three chracters long').required('firstname is required'),
    lastName: Yup.string().min(3, 'lastname must be three chracters long').max(20, 'lastname must be three chracters long').required('lastname is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(128, 'Password must be no more than 128 characters long')
        .matches(/[a-zA-Z0-9_]+/, 'Password must only contain letters, numbers, and underscores')
        .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]+/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?/'"/\\|~`\-]/, 'Must contain at least one special character'),
});


