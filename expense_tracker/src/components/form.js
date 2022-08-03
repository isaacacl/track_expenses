import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

const Form = ({ addItem, input, setInput, formatDate }) => {

    // const dateSelected = ({ date, view }) => {
    //     if (view === 'month') {
    //         if (date.getDate() === calDate.getDate() &&
    //             date.getMonth() === calDate.getMonth() &&
    //             date.getYear() === calDate.getYear()) {
    //             return 'highlighted'
    //         }
    //     }
    // }

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleCalendarChange = (nextValue) => {
        setInput({
            ...input,
            calDate: nextValue,
            formattedCalDate: formatDate(nextValue)
        })
        console.log(input.calDate)
    }

    return (
        <form className="form-container" onSubmit={addItem}>
            <div className="text-forms">
                <div className="form-group">
                    <label htmlFor='expense-field'>Enter expense: </label>
                    <input 
                        id='expense-field' 
                        name='expenseInput'
                        type='text' 
                        onChange={handleChange}
                        value={input.expenseInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='amount-field'>$ Amount: </label>
                    <input
                        id='amount-field'
                        name='amountInput'
                        type='number'
                        step='0.01'
                        onChange={handleChange}
                        value={input.amountInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='category-field'>Category: </label>
                    <input
                        id='category-field'
                        name="catInput"
                        type='text'
                        onChange={handleChange}
                        value={input.catInput}
                        required
                    />
                </div>
                <button 
                    id="new-expense-button"
                    type='submit' 
                    disabled={!input}>
                    add
                </button>
            </div>
            <div className="calendar-container">
                <Calendar 
                    name="calDate"
                    className="calendar"
                    value={input.calDate} 
                    onChange={handleCalendarChange}
                    // tileClassName={dateSelected}
                />
            </div>

        </form>
    )
}

export default Form