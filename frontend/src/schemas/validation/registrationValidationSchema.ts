import * as yup from 'yup'

export const registrationValidationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]{3,15}$/, 'Invalid username'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
})
