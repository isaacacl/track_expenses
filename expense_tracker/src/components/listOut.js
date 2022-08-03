import { deleteExpense } from "../actions/expenses"
import { deleteCategory } from "../actions/categories"
import { useCallback, useEffect, useState } from "react"
import { load_user } from "../actions/auth"


const ListOut = ({ expenses, dispatchExpense, user, dispatch }) => {
  const [userData, setUserData] = useState([])

  const gatherUserData = useCallback(() => {
    if (user) {
      setUserData(expenses.categories.filter(cat => 
          cat.owner === user.id
      ))
    }
  }, [user, expenses.categories])

  useEffect(() => {
    load_user(dispatch)
    gatherUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleExpenseRemove = expense => {
    deleteExpense(expense.id, dispatchExpense)
  }

  const handleCategoryRemove = cat => {
    deleteCategory(cat.id, dispatchExpense)
  }

  if (userData.length < 1) {
    return (
      <div className="container">
        <p>Submit some expenses to start tracking! Add the amount spent and 
            the purchase category for more accurate reporting.
        </p>
      </div>
    )
  }

  return userData.map(cat => 
    <div key={cat.id} id="user-data-container">
      <h2 className="category-container">
        <span className="category-info" >
          {cat.name}
        </span>
        <button 
          type='button' 
          onClick={() => handleCategoryRemove(cat)}
          className="remove-button"
        >
          remove
        </button>
      </h2>
      {expenses.expenses.map(expense => {
      if (expense.category === cat.id) {
        return (
          <div className="expense-container">
            <div key={expense.id} className="expense-info">
              <span className="date">
                {expense.date.length <= 9 ? 
                  (expense.date.slice(0,4)) : (expense.date.slice(0,5))}
              </span>
              <span className="amount">
                ${expense.amount}
              </span>
              <span className="name">
                {expense.name}
              </span>
            </div>
            <div className="remove-button-container">
              <button 
                type='button'
                onClick={() => handleExpenseRemove(expense)}
                className="remove-button"
              >
                remove
              </button>
            </div>
          </div>
        )
      } else return null
      })}
    </div>
  )
}

export default ListOut