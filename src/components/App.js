import React, {Component, Fragment} from "react";
import SignUpForm from './SignUpForm'
import ExpenseForm from "./ExpenseForm";

class App extends Component {
    state = {
        expenses: [],
        nextExpenseId: 0,
        isCreatingExpense: false,
        currentlyEditedExpense: null
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

    showEditionForm = expense => {
        this.setState({currentlyEditedExpense: expense})
    }
    updateExpense = expenseInfos => {
        const { expenses } = this.state
        const expenseIndex = expenses.findIndex(e => e.id === expenseInfos.id )
        const expensesBefore = expenses.slice(0, expenseIndex)
        const expensesAfter = expenses.slice(expenseIndex + 1)
        this.setState({
            expenses: [
                ...expensesBefore,
                expenseInfos,
                ...expensesAfter
            ],
            currentlyEditedExpense: null
        })
    }

    renderCreateExpenseForm = () => {
        return(
            <Fragment>
                <Fragment>
                    <h2>Edit expense</h2>
                    <ExpenseForm
                        onSubmit={this.createExpense()}
                        onCance={this.onCreateExpenseCancel}
                    />
                </Fragment>
            </Fragment>
        )
    }

    renderEditExpenseForm = () => {
        const expense = this.state.currentlyEditedExpense
        return (
            <Fragment>
                <h2>Edit expense</h2>
                <ExpenseForm
                    expense={expense}
                    onSubmit={this.updateExpense}
                    onCancel={this.onUpdateExpenseCancel}
                />
            </Fragment>
        )
    }

    renderExpensesList = () => {
        return (
            <Fragment>
                <h2>Expenses</h2>
                <button
                    className="primary"
                    onClick={this.showCreationForm}>
                    Create
                </button>
                {this.state.expenses.length > 0 ? (
                    <ul>
                        {this.state.expenses.map(expense => (
                            <li key={expense.id}>
                                <button onClick={ () => this.showEditionForm(expense)}>Edit</button>
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

    render() {
        if (this.state.isCreatingExpense) {
            return this.renderCreateExpenseForm()
        }
        if (this.state.currentlyEditedExpense) {
            return this.renderEditExpenseForm()
        }
        return this.renderExpensesList()
    }
}

export default App