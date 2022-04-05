import React from "react";
import { Formik } from "formik";

const SignUpForm = () => (
    <Formik
        initialValues={{
        username: '',
        password: '',
        passwordRepeat: '',
    }}
        validate={values => {
            const errors = {}
            if (!values.username) {
                errors.username = 'Please enter a user name'
            } else if (
                !values.username.match(/[a-z][a-z0-9_\-.]{2,15}/i)
            ){
                errors.username = 'PLease enter a valid user name'
            }
            return errors
        }}
        onSubmit={values => console.log(values)}
        >
        {({values, handleChange, handleSubmit, errors}) => (
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    User name:
                    <input type="text" name="username" value={values.username} onChange={handleChange} />
                    {errors.username && <span className="error">{errors.username}</span>}
                </label>
                <label htmlFor="">
                    Password :
                    <input type="password" name="password"/>
                </label>
                <label htmlFor="">
                    Password (repeat) :
                    <input type="password" name="passwordRepeat"/>
                </label>
                <button type="submit">Sign up</button>
            </form>
                )}
    </Formik>
)

export default SignUpForm