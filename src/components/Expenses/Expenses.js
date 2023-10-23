import React, {useState} from "react";
import './Expenses.css';
import ExpenseFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpenseChart from "./ExpenseChart";

const Expenses = (props) => {

	const [selectedData, setSelectedData] = useState([]);

	const filterChangeHandler = (selectedYear) => {
		const filteredExpenses = props.items.filter((expense) => {
			const expenseYear = String(new Date(expense.date).getFullYear());
			return expenseYear === selectedYear;
		});
		setSelectedData(filteredExpenses);
	};

	return (
		<Card className="expenses">
			<ExpenseFilter items={props.items} onFilterChange={filterChangeHandler} />
			<ExpenseChart items={selectedData} className={"expense_chart__plus"} />
			<ExpenseChart items={selectedData} className={"expense_chart__minus"} />
			<ExpensesList items={selectedData} onDeleteExpense={props.onDeleteExpense} onModifyExpense={props.onModifyExpense}/>
		</Card>
	)
}
export default Expenses;