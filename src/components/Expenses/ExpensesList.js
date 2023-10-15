import React from "react";
import './ExpensesList.css';
import ExpenseItem from "./ExpenseItem";
const ExpensesList = (props) => {

	let data = props.items;

	// 날짜를 비교하는 비교 함수를 정의
	const dateComparator = (a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateA - dateB;
	};

	// 데이터를 날짜순으로 정렬
	data.sort(dateComparator);

	const expenseItemSingle = data.map((dataItem) => (
		<ExpenseItem
			key={dataItem.id}
			amount={dataItem.amount}
			title={dataItem.title}
			date={dataItem.date}
		/>
	));

	return <ul className="expenses-list">{expenseItemSingle}</ul>;
}
export default ExpensesList;