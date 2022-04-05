import React from "react";
import {ErrorMessage, Field, Formik} from "formik";

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
            if (!values.password) {
                errors.password = 'Please enter a password'
            } else if (!values.password.length <= 8 && values.password.match(/[a-z][a-z0-9_\-.]{2,15}/i)) {
                errors.password = 'Your password need 8 caracteres to be valid'
            }
            if (!values.password === !values.passwordRepeat) {
                errors.passwordRepeat = 'Please enter the same password'
            }
            return errors
        }}
        onSubmit={values => console.log(values)}
        >
        {({ handleSubmit }) => (

            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    User name:
                    <Field type="text" name="username"/>
                    <ErrorMessage
                        name="username" className="error" component="span"
                    />
                </label>
                <label htmlFor="">
                    Password :
                    <Field type="password" name="password" />
                    <ErrorMessage
                        name="password" className="error" component="span"
                    />
                </label>
                <label htmlFor="">
                    Password (repeat) :
                    <Field type="password" name="passwordRepeat" />
                    <ErrorMessage
                        name="passwordRepeat" className="error" component="span"
                    />
                </label>
                <button type="submit">Sign up</button>
            </form>
                )}
    </Formik>
)

export default SignUpForm