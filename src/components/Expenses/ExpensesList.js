import React from "react";
import './ExpensesList.css';
import ExpenseItem from "./ExpenseItem";
import ExpenseDate from "./ExpenseDate";
import {expensesSet, yearSelect} from "../../actions/actions";
import {connect} from "react-redux";
const ExpensesList = (props) => {

	const data = props.expensesSetArr;
	data.sort((a, b) => {
		const dateComparison = new Date(a.date) - new Date(b.date);
		if (dateComparison === 0) {
			return a.id.localeCompare(b.id);
		}
		return dateComparison;
	});

	if (data.length > 0) {
		const dateGroups = data.reduce((groups, dataItem) => {
			const date = dataItem.date;
			groups[date] = [...(groups[date] || []), dataItem];
			return groups;
		}, {});

		const expenseItemGroups = Object.entries(dateGroups).map(([date, groupData]) => (
			<div key={date} className="expenses-list-wrapper">
				<ExpenseDate date={date} />
				<ul className="expenses-list">
					{groupData.map(dataItem => (
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
					))}
				</ul>
			</div>
		));

		return (
			<div className="expenses-list-container">
				<strong>입출금 목록</strong>
				{expenseItemGroups}
			</div>
		);
	} else {
		return (
			<ul className="expenses-list expense-list-dummy">
				<ExpenseItem key={'dummy'} id={'dummy'} />
			</ul>
		);
	}

}
const mapStateToProps = (state) => {
	return {
		expenses: state.expenses,
		expensesSetArr: state.expensesSetArr,
		yearSelected: state.yearSelected,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		expensesSet: (expenseData) => dispatch(expensesSet(expenseData)),
		yearSelect: (str) => dispatch(yearSelect(str)),
	};
};


//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);