import React, { useState, useEffect } from "react";
import './ExpenseFilter.css'
import Select from 'react-select';
import {expensesSet, expenseUpdateFlag, yearSelect} from "../../actions/actions";
import {connect} from "react-redux";

const ExpenseFilter = (props) => {

	const [selectedOption, setSelectedOption] = useState(null);
	const uniqueYears = props.expenses.length > 0 ? [...new Set(props.expenses.map(item => new Date(item.date)) // item.date를 날짜 객체로 변환
		.filter(date => !isNaN(date.getTime()))
		.map(date => date.getFullYear())
		.sort((a, b) => a - b)
	)] : [];
	const optionsDummy = [
		{ value: '-', label: '-' },
	];
	const optionsReal = uniqueYears.map((year) => (
		{value: String(year), label: String(year)}
	));
	const dynamicOptions = props.expenses.length == 0 ? optionsDummy : optionsReal;
	const defaultValue = dynamicOptions[0];

	useEffect(() => {
		if(props.yearSelected == 0){
			if(uniqueYears.length !== 0){
				const lastInputYear = String(uniqueYears[uniqueYears.length-1]);
				setSelectedOption({ value: lastInputYear, label: lastInputYear },);
				props.yearSelect(lastInputYear);
			}else{
				setSelectedOption({ value: '-', label: '-' },);
				props.yearSelect('-');
				props.expensesSet([]);
			}
		}else{
			const filteredExpenses = props.expenses.filter((expense) => {
				const expenseYear = String(new Date(expense.date).getFullYear());
				return expenseYear === props.yearSelected;
			});
			props.expensesSet(filteredExpenses);
			setSelectedOption({ value: props.yearSelected, label: props.yearSelected },);
		}
	}, [props.yearSelected]);


	const handleFilterChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		props.yearSelect(selectedOption.value);
	};

	return (
		<div className="expenses-filter">
			<div className="expenses-filter__control">
				<label>연도별 보기</label>
				<Select options={dynamicOptions} className="react-select-container" classNamePrefix="react-select" onChange={handleFilterChange} value={selectedOption || defaultValue}/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		expenses: state.expenses,
		expensesSetArr: state.expensesSetArr,
		yearSelected: state.yearSelected,
		expensesUpdateFlag: state.expensesUpdateFlag,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		expensesSet: (expenseData) => dispatch(expensesSet(expenseData)),
		yearSelect: (str) => dispatch(yearSelect(str)),
		expenseUpdateFlag: (boo) => dispatch(expenseUpdateFlag(boo)),
	};
};


//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilter);