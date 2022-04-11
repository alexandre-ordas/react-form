import React, {useState, useCallback, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ExpenseView from "./Expense/ExpenseView"
import Expenses from "./Expense/Expenses"
import CreateExpenseForm from "./Expense/CreateExpenseForm"
import EditExpense from "./Expense/EditExpense"
import ExpenseDetails from "./Expense/ExpenseDetails"
//import NotFound from "./NotFound";

function App() {
    const [expenses, setExpenses] =  useState([])
    const [nextExpenseId, setNextExpenseId] = useState(0)
    const [hasFetchedFirst, setHasFetchedFirst] = useState(false)

    const saveStateToLocalStorage = () => {
        window.localStorage.setItem('expenses', JSON.stringify(expenses))
        window.localStorage.setItem('expenseId', JSON.stringify(nextExpenseId))
    }

    const loadStateFromLocalStorage = () => {
        const expensesJSON = window.localStorage.getItem('expenses')
        const expenseIdJSON = window.localStorage.getItem('expenseId')

        if (expensesJSON && expenseIdJSON) {
            setExpenses(JSON.parse(expensesJSON))
            setNextExpenseId(JSON.parse(expenseIdJSON))
        }
    }

    useEffect(() => {
        if (!hasFetchedFirst) {
            setHasFetchedFirst(true)
            loadStateFromLocalStorage()

        }
    })

    const create = useCallback(
        (expenseInfos) => {
            const newExpense = {id: nextExpenseId, ...expenseInfos}
            setNextExpenseId(nextExpenseId + 1)
            setExpenses([...expenses, newExpense])
            saveStateToLocalStorage()
        },
        [expenses, nextExpenseId]
    )

   const update = useCallback(
        expenseInfos => {
            const expenseIndex = expenses.findIndex(e => e.id === expenseInfos.id )
            const expensesBefore = expenses.slice(0, expenseIndex)
            const expensesAfter = expenses.slice(expenseIndex + 1)
            setExpenses([...expensesBefore, expenseInfos, ...expensesAfter])
            saveStateToLocalStorage()
        },
        [expenses]
    )



    return (
          <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Expenses expenses={expenses}/>}/>
                        <Route path="/create" element={<CreateExpenseForm create={create}/>}/>
                        <Route path="/:id/" element={<ExpenseView expenses={expenses}/>}>
                            <Route path="details" element={<ExpenseDetails expenses={expenses}/>}/>
                            <Route path="edit" element={<EditExpense expenses={expenses} update={update}/>}/>
                        </Route>
                        {/*<Route path="*" element={<NotFound/>}/>*/}
                    </Routes>
                </Router>
          </div>
    )

}

export default App