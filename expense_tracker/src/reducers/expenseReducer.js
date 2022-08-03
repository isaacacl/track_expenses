
const unpackNestedData = data => {
    const cats = []
    const expenses = []
    data.forEach(cat => {
      const { expense_set, ...catInfo } = cat
      cats.push(catInfo)
      expense_set.forEach(expense => expenses.push(expense))
    })
    return [cats, expenses]
  }

const expenseReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'API_CALL_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'API_CALL_SUCCESS':
      const [ cats, exp ] = unpackNestedData(payload)
      console.log(exp)
      return {
        categories: cats,
        expenses: exp,
        isLoading: false,
        isError: false
      }
    case 'API_CALL_FAILURE':
      console.log(`${type}\n${payload}`)
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      console.log(type)
      throw new Error('Expense action not supported')
  }
}

export default expenseReducer