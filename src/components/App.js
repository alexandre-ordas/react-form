import React, {Component, Fragment} from "react";
import SignUpForm from './SignUpForm'
import ExpenseForm from "./ExpenseForm";

class App extends Component {
    state = {
        expenses: [],
        nextExpenseId: 0,
        isCreatingExpense: false,
    }

    showCreationForm = () => {
        this.setState({ isCreatingExpense: true})
    }

    createExpense = expenseInfos => {
        this.setState({
            expenses: [
                {id: this.state.nextExpenseId, ...expenseInfos },
                ...this.state.expenses
            ],
            nextExpenseId: this.state.nextExpenseId + 1,
            isCreatingExpense: false
        })
    }

    render() {
        if (this.state.isCreatingExpense) {
            return (
                <Fragment>
                    <h2>Create a new expense</h2>
                    <ExpenseForm onSubmit={this.createExpense} />
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h2>Expenses</h2>
                <button onClick={this.showCreationForm}>Create</button>
                {this.state.expenses.length > 0 ? (
                    <ul>
                        {this.state.expenses.map(expense => (
                            <li key={expense.id}>
                                {expense.title} : {expense.amount} € spent on{' '}
                                {new Date(expense.date).toDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No expense yet.</p>
                )}
            </Fragment>
        )

        //return <SignUpForm/>
    }
}

export default App