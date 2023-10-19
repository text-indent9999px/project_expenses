import React from "react";
import './ExpensesList.css';
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
const ExpensesList = (props) => {

	let data = props.items;

	if(data.length > 0){

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
				id={dataItem.id}
				data={dataItem}
				amount={dataItem.amount}
				title={dataItem.title}
				date={dataItem.date}
				amountType={dataItem.amountType}
				category={dataItem.category}
				onDeleteExpense={props.onDeleteExpense}
				onModifyExpense={props.onModifyExpense}
			/>
		));
		return <ul className="expenses-list">{expenseItemSingle}</ul>;

	}else{
		return <ul className="expenses-list">
			<ExpenseItem key={'dummy'} id={'dummy'}/>
		</ul>;
	}

}
export default ExpensesList;