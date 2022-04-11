import React, {Fragment} from 'react';
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";

function ExpenseView({expenses}) {
        const { id } = useParams();
        const expense = expenses.find(e => e.id === Number(id))
        if (!expense) {
            return (
                <Fragment>
                    <p>Nothing here.</p>
                    <Link to="/" className="button primary">Go back to expense list</Link>
                </Fragment>
            )
        }
        return (
            <div>
                <nav>
                    <Link to="details">Details</Link>

                    <Link to="edit">Edit</Link>
                </nav>

                <Outlet />
            </div>
        )
}

export default ExpenseView;