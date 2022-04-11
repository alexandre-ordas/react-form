import React, {Fragment} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ExpenseForm from "../ExpenseForm";

const EditExpense = ({expenses, update}) => {

        const navigate = useNavigate()
        const {id} = useParams()
        const expense = expenses.find(e => e.id === Number(id))
        return (
            <Fragment>
                <h2>Edit expense</h2>
                <ExpenseForm
                    expense={expense}
                    onSubmit={ expenseInfos => {
                        update(expenseInfos)
                        navigate(`/${expense.id}`)
                    }}
                    onCancel={ () => {
                        navigate(`/${expense.id}`)
                    }}
                />
            </Fragment>
        )
}

export default EditExpense;