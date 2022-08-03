import axios from "axios"
import { postNewExpense, getAllExpenses } from "./expenses"


export const postNewCategory = (input,
                                postChildExpenseFlag, 
                                dispatchExpense,
                                user) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const data = {
        name: input.catInput,
        owner: user.id
    }
    axios.post(`${process.env.REACT_APP_API_URL}`, data, config)
    .then(response => {
        if (postChildExpenseFlag) {
            postNewExpense(input, response.data.id, dispatchExpense)
        }
    }, error => {
        console.log(error)
    })
}

export const deleteCategory = (id, dispatchExpense) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/${id}/`)
    .then(() => {
        getAllExpenses(dispatchExpense)
    })
    .catch(error => {
        console.log(error)
    })
}