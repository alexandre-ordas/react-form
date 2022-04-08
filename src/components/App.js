import React, {Component, Fragment} from "react";
import SignUpForm from './SignUpForm'
import ExpenseForm from "./ExpenseForm";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    useNavigate, useParams
} from "react-router-dom";


class App extends Component {
    state = {
        expenses: [],
        nextExpenseId: 0
    }

    componentDidMount() {
        this.loadStateFromLocalStorage()
    }

    createExpense = expenseInfos => {
        this.setState({
            expenses: [
                {id: this.state.nextExpenseId, ...expenseInfos },
                ...this.state.expenses
            ],
            nextExpenseId: this.state.nextExpenseId + 1,
        },
            this.saveStateToLocalStorage
            )

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
            ]
        },
            this.saveStateToLocalStorage
        )

    }

    saveStateToLocalStorage = () => {
        window.localStorage.setItem('state', JSON.stringify(this.state))
    }

    loadStateFromLocalStorage = () => {
        const stateJSON = window.localStorage.getItem('state')
        if (stateJSON) {
            this.setState(JSON.parse(stateJSON))
        }
    }

    renderCreateExpenseForm = ({ history }) => {
        let navigate = useNavigate()
        return(
            <Fragment>
                <Fragment>
                    <h2>Create a new expense</h2>
                    <ExpenseForm
                        onSubmit={expenseInfos => {
                            this.createExpense(expenseInfos)
                            navigate('/')
                        }}
                        onCancel={() => { navigate('/')}}
                    />
                </Fragment>
            </Fragment>
        )
    }

    renderEditExpenseForm = ({match}) => {
        let navigate = useNavigate()
        const { id } = useParams();
        const expense = this.state.expenses.find(e => e.id === Number(id))
        if (!expense) {
            return (
                <Fragment>
                    <p>No expense with this ID.</p>
                    <Link to="/" className="button primary">Go back to expense list</Link>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h2>Edit expense</h2>
                <ExpenseForm
                    expense={expense}
                    onSubmit={ expenseInfos => {
                        this.updateExpense(expenseInfos)
                        navigate('/')
                    }}
                    onCancel={ () => {
                        navigate('/')
                    }}
                />
            </Fragment>
        )
    }

    renderExpensesList = () => {
        return (
            <Fragment>
                <h2>Expenses</h2>
                    <Link to="/create" className="button primary">
                        Create
                    </Link>
                {this.state.expenses.length > 0 ? (
                    <ul>
                        {this.state.expenses.map(expense => (
                            <li key={expense.id}>
                                    <Link to={`/${expense.id}`} className="button">
                                        Edit
                                    </Link>
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
    }

    renderNotFound = () => {
        return (
            <Fragment>
                <p>Nothing here ...</p>
                <Link to="/" className="button">
                    Go back to expense list
                </Link>
            </Fragment>
        )
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<this.renderExpensesList/>} />
                    <Route path="/create" element={<this.renderCreateExpenseForm/>} />
                    <Route path="/:id" element={<this.renderEditExpenseForm/>} />
                    <Route element={<this.renderNotFound/>}/>

                </Routes>
            </Router>
        )
    }
}

export default App