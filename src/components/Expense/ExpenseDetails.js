import React, {Fragment} from 'react';
import {Link, useParams} from "react-router-dom";

function ExpenseDetails({expenses}) {
        const {id} = useParams()
        const expense = expenses.find(e => e.id === Number(id))
        return (
            <Fragment>
                <h2>Expense Details</h2>
                <Link to="/" className="button">
                    Back
                </Link>
                <Link to={`/${expense.id}/edit`} className="button primary">
                    Edit
                </Link>
                <p>
                    Title : <strong>{expense.title}</strong>
                </p>
                <p>
                    Date: <strong>{expense.date}</strong>
                </p>
                <p>
                    Amount: <strong>{expense.amount}</strong> €
                </p>
                <p>
                    Notes: <strong>{expense.notes}</strong>
                </p>
            </Fragment>
        );
}

export default ExpenseDetails;