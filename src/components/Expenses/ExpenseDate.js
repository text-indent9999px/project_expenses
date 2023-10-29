import React from "react";
import './ExpenseDate.css'
const ExpenseDate = (props) => {

	let date = props.date;
	date = new Date(date);
	const options = { month: 'short' };
	const monthName = date.toLocaleDateString('en-US', options);
	const weekday = new Array(7);
	weekday[0] = "일요일";
	weekday[1] = "월요일";
	weekday[2] = "화요일";
	weekday[3] = "수요일";
	weekday[4] = "목요일";
	weekday[5] = "금요일";
	weekday[6] = "토요일";

	return (
		<div className="expense-date">
			<div className="expense-date__year">{`${date.getFullYear()}년`}</div>
			<div className="expense-date__month">{`${date.getMonth() + 1}월`}</div>
			<div className="expense-date__date">{`${date.getDate()}일`}</div>
			<div className="expense-date__day">{`${weekday[date.getDay()]}`}</div>
		</div>
	)
}
export default ExpenseDate;