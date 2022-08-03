import React, { useEffect, useReducer, useState } from 'react'
import expenseReducer from '../reducers/expenseReducer'
import { postNewCategory } from '../actions/categories'
import { postNewExpense, getAllExpenses } from '../actions/expenses'
import Form from '../components/form'
import ListOut from '../components/listOut'

const Home = ({ auth, dispatch }) => {
    const [expenses, dispatchExpense] = useReducer(expenseReducer, 
        { categories: [], expenses: [], isLoading: false, isError: false })


    const formatDateToString = (value) => {
        const getMonthFromString = (mon) => 
            new Date(Date.parse(mon +" 20, 2001")).getMonth()+1
        // ignore day of week
        const [ , month, date, year ] = value.toString().split(' ')
        return `${getMonthFromString(month)}/${date}/${year}`
    }

    const [input, setInput] = useState({
        expenseInput: '', amountInput: '', catInput: '',
        calDate: new Date(), formattedCalDate: formatDateToString(new Date())
    })
        
    useEffect(() => {
        getAllExpenses(dispatchExpense)
    }, [])  
    
    const callPostRequests = () => {
        const nameOwnerMatches = expenses.categories.filter(cat => 
            (cat.name.toLowerCase() === input.catInput.toLowerCase()) && 
            (cat.owner === auth.user.id))
        if (nameOwnerMatches.length < 1) {
            postNewCategory(input, true, dispatchExpense, auth.user)
        } else {
            postNewExpense(input, nameOwnerMatches[0].id, dispatchExpense)
        }
    }
    
    const handleSubmitNewExpense = e => {
        e.preventDefault()
        callPostRequests()
    }

    return (
        <div>
            {auth.IsAuthenticated ? (
                <div>
                    <Form 
                        input={input}
                        addItem={handleSubmitNewExpense}
                        setInput={setInput}
                        formatDate={formatDateToString}
                    />
                    <hr />
                    {expenses.isError && <p>Unknown Error</p>}
                    {expenses.isLoading ? (<p>Loading...</p>
                    ) : (
                        <ListOut 
                            expenses={expenses}
                            dispatchExpense={dispatchExpense}
                            user={auth.user}
                            dispatch={dispatch}
                        />
                    )}
                </div>
            ) : (
                <div>
                    Not signed in
                </div>
            )} 
        </div>
    )
}

export default Home