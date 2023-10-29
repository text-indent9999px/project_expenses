import React, {useEffect, useState} from "react";
import './Expenses.css';
import ExpenseFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpenseChart from "./ExpenseChart";
import ExpensesSummary from "./ExpensesSummary";
import {connect} from "react-redux";
import {expensesSet, yearSelect} from "../../actions/actions";
const Expenses = (props) => {

	return (
		<div className="expenses-container">
			<Card className="expenses">
				<ExpenseFilter />
				<ExpensesSummary />
				<ExpenseChart className={"expense_chart__plus"} />
				<ExpenseChart className={"expense_chart__minus"} />
				<ExpensesList />
			</Card>
		</div>
	)
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

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
