import React from "react";
import {Link} from "react-router-dom";

const Expenses = ({expenses}) => {
    console.log(expenses)
    return (
        <div>
            <h2>Expenses</h2>
            <Link to="/create" className="button primary" >
                Create
            </Link>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map(expense => (
                        <li key={expense.id}>
                            <Link to={`/${expense.id}`}>
                                {expense.title} : {expense.amount} € spent on{' '}
                                {new Date(expense.date).toDateString()}
                            </Link>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expense yet.</p>
            )}
        </div>
    )

}

export default Expenses