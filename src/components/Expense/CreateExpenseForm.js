import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import ExpenseForm from "../ExpenseForm";

const CreateExpenseForm = ({create}) => {

    const navigate = useNavigate()

    return(
        <Fragment>
            <Fragment>
                <h2>Create a new expense</h2>
                <ExpenseForm
                    onSubmit={expenseInfos => {
                        create(expenseInfos)
                        navigate('/')
                    }}
                    onCancel={() => { navigate('/')}}
                />
            </Fragment>
        </Fragment>
    )
}

export default CreateExpenseForm