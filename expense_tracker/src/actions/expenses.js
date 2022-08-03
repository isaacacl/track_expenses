import axios from "axios"

export const getAllExpenses = dispatchExpense => {
    dispatchExpense({ type: 'API_CALL_INIT' })
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}`
    })
    .then(result => {
        dispatchExpense({ 
            type: 'API_CALL_SUCCESS',
            payload: result.data
        })
    })
    .catch(error => dispatchExpense({ 
        type: 'API_CALL_FAILURE',
        payload: error
    }))
  }
  

export const postNewExpense = (input, catKey, dispatchExpense) => {
    console.log(input)
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/expenses/`,
        data: {
        name: input.expenseInput,
        amount: input.amountInput,
        category: catKey,
        date: input.formattedCalDate
        }
    })
    .then(() => {
        getAllExpenses(dispatchExpense)
    }, error => {
        console.log(error)
    })
    }

export const deleteExpense = (id, dispatchExpense) => {
    axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_API_URL}/expenses/${id}/`
    })
    .then(() => {
        getAllExpenses(dispatchExpense)
    })
    .catch(error => {
        console.log(error)
    })
}