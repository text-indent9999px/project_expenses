import React from "react";
import './ExpenseDate.css'
const ExpenseDate = (props) => {

	let date = props.date;
	date = new Date(date);
	const options = { month: 'short' };
	const monthName = date.toLocaleDateString('en-US', options);

	return (
		<div className="expense-date">
			<div className="expense-date__month">{monthName}</div>
			<div className="expense-date__year">{date.getFullYear()}</div>
			<div className="expense-date__day">{date.getDate()}</div>
		</div>
	)
}
export default ExpenseDate;