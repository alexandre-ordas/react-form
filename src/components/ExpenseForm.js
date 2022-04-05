import React, {Component} from "react";
import { Formik, Field, ErrorMessage } from "formik";

class ExpenseForm extends Component {
    defaultValues = {
        title: '',
        date: new Date()
            .toISOString()
            .split('T')
            .shift(), // yyyy-mm-dd,
        amount: 0,
        notes: ''
    }
    validate = values => {
        const errors = {}
        if (!values.title) {
            errors.title = 'Please enter a title.'
        }
        if (!values.date) {
            errors.date = 'Please enter a date.'
        }
        if (!values.amount) {
            errors.amount = 'Please enter a non zero-amount.'
        }
        return errors
    }
    onSubmit = expense => {
        this.props.onSubmit(expense)
    }

    renderError(name) {
        return <ErrorMessage name={name} component="span" className="error" />
    }
    render() {
        return (
            <Formik
                initialValues={this.defaultValues}
                validate={this.validate}
                onSubmit={this.onSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form className="expense-form" onSubmit={handleSubmit}>
                        <label htmlFor="">
                            Title : <Field type="text" name="title" />
                        </label>
                        <label htmlFor="">
                            Date : <Field type="date" name="date" />
                        </label>
                        <label htmlFor="">
                            Amount (€) : <Field type="number" name="amount" />
                        </label>
                        <label htmlFor="">
                            Notes : <Field component="textarea" name="notes" />
                        </label>
                        <button type="submit">Create</button>
                    </form>
                )}
            </Formik>
        )
    }
}

export default ExpenseForm