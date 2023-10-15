import React from "react";
import './ExpenseDate.css'
const ExpenseDate = (props) => {

	let date = props.date;
	date = new Date(date);

	return (
		<div className="expense-date">
			<div className="expense-date__month">{date.getMonth() + 1}</div>
			<div className="expense-date__year">{date.getFullYear()}</div>
			<div className="expense-date__day">{date.getDate()}</div>
		</div>
	)
}
export default ExpenseDate;