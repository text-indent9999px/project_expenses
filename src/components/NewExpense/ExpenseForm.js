import React, { useState, useRef, useEffect } from "react";
import './ExpenseForm.css';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from 'react-redux';
import {
	expensesAdd,
	expensesModify,
	expensesDelete,
	expensesSelect,
	expensesClick, alertPopupState, expenseUpdateFlag, expensesSet, yearSelect, alertPopupMessage, yearSelectBefore,
} from "../../actions/actions";

const ExpenseForm = (props) => {

	const contentRef = useRef();
	const [inputExpenses, setInputExpenses] = useState({
		id: Date.now().toString(),
		title : '',
		amount: '',
		amountType: 'plus',
		category: props.expensesForm_plusCategory[0].value,
		date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
	});
	const { id, title, amount, amountType, category, date } = inputExpenses;

	const dynamicOptions = amountType === 'plus' ? props.expensesForm_plusCategory : props.expensesForm_minusCategory;
	const defaultValue = dynamicOptions[0];
	const [selectedOption, setSelectedOption] = useState(null);
	const [startDate, setStartDate] = useState(new Date());

	useEffect(() => {
		if(props.expensesSelected.length > 0){
			setInputExpenses(props.expensesSelected[0]);
			const selectedCategory = props.expensesSelected[0].category;
			const selectedAmountType = props.expensesSelected[0].amountType;
			const selectedOptions = selectedAmountType === 'plus' ? props.expensesForm_plusCategory : props.expensesForm_minusCategory;
			const selectedOptionChk = selectedOptions.find((e) => e.value === selectedCategory);
			setSelectedOption(selectedOptionChk);
			setStartDate(new Date(props.expensesSelected[0].date));
		}else{
			resetHandler();
		}
	}, [props.expensesSelected]);


	useEffect(() => {
		if(props.expensesUpdateFlag){
			const filteredExpenses = props.expenses.filter((expense) => {
				const expenseYear = String(new Date(expense.date).getFullYear());
				return expenseYear === String(props.yearSelectedBefore);
			});
			if(filteredExpenses.length == 0){
				props.yearSelect(0);
			}else{
				props.expensesSet(filteredExpenses);
			}
			props.yearSelectBefore(props.yearSelected);
			props.expenseUpdateFlag(false);
		}
	}, [props.expensesUpdateFlag]);

	const handleCancelButtonClick = () => {
		props.expensesSelect([]);
	};

	const handleAddExpense = () => {
		setInputExpenses({ ...inputExpenses, id: Date.now().toString() });
		if (title.trim() !== '' && amount > 0 && date.trim() !== '') {
			props.expensesAdd(inputExpenses);
			props.yearSelectBefore(String(new Date(inputExpenses.date).getFullYear()));
			props.yearSelect(String(new Date(inputExpenses.date).getFullYear()));
			props.expensesSelect([]);
			props.expensesClick(false);
			props.expenseUpdateFlag(true);
			console.log(inputExpenses);
		}else{
			props.alertPopupState(true);
			props.alertPopupMessage('입력항목을 확인해주세요.');
		}
	};

	const handleModifyExpense = () => {
		if (title.trim() !== '' && amount > 0 && date.trim() !== '') {
			props.expensesModify(inputExpenses);
			props.expensesSelect([]);
			props.expensesClick(false);
			props.yearSelectBefore(String(new Date(inputExpenses.date).getFullYear()));
			props.yearSelect(String(new Date(inputExpenses.date).getFullYear()));
			props.expenseUpdateFlag(true);
			console.log(inputExpenses);
		}else{
			props.alertPopupState(true);
			props.alertPopupMessage('입력항목을 확인해주세요.');
		}
	};

	const handleAmountTypeChange = (event) => {
		if(event.target.value == 'plus'){
			setSelectedOption(props.expensesForm_plusCategory[0]);
			setInputExpenses({ ...inputExpenses, amountType: event.target.value, category: props.expensesForm_plusCategory[0].value });
		}else{
			setSelectedOption(props.expensesForm_minusCategory[0]);
			setInputExpenses({ ...inputExpenses, amountType: event.target.value, category: props.expensesForm_minusCategory[0].value });
		}
	};

	const handleSelectChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		setInputExpenses({ ...inputExpenses, category: selectedOption.value });
	}

	const handleAmountChange = (event) => {
		const inputValue = event.target.value;
		const numberPattern = /\d+/g;
		const numbers = inputValue.match(numberPattern);
		const result = numbers ? numbers.join('') : '';
		setInputExpenses({ ...inputExpenses, amount: result });
	}

	const dateChangeHandler = (date) => {
		if(date !== null){
			setStartDate(date);
			setInputExpenses({ ...inputExpenses, date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() });
		}
	}

	const resetHandler = () => {
		setInputExpenses({
			id: Date.now().toString(),
			title : '',
			amount: '',
			amountType: 'plus',
			category: props.expensesForm_plusCategory[0].value,
			date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
		});
		setStartDate(new Date());
		setSelectedOption({value: props.expensesForm_plusCategory[0].value, label: props.expensesForm_plusCategory[0].value});
	}

	return (
		<form className={`new-expense__form`}>
			<div className="new-expense__controls" ref={contentRef}>
				<div className="new-expense__control new-expense__controlTitle">
					<label htmlFor="">내용</label>
					<input type="text" value={inputExpenses.title} onChange={(e) => setInputExpenses({ ...inputExpenses, title: e.target.value })} />
				</div>
				<div className="new-expense__control new-expense__controlAmount">
					<label htmlFor="">비용</label>
					<input type="text" value={inputExpenses.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={handleAmountChange} />
					<div className="new-expense__amountType">
						<input type="radio" value="plus" name="amountType" id="amountTypeP" checked={inputExpenses.amountType === 'plus'}
							   onChange={handleAmountTypeChange} />
						<label htmlFor="amountTypeP" className={"controls__button"}>수입</label>
						<input type="radio" value="minus" name="amountType" id="amountTypeM"
							   checked={inputExpenses.amountType === 'minus'}
							   onChange={handleAmountTypeChange} />
						<label htmlFor="amountTypeM" className={"controls__button"}>지출</label>
					</div>
				</div>
				<div className="new-expense__control new-expense__controlCategory">
					<label htmlFor="">분류</label>
					<Select options={dynamicOptions} onChange={handleSelectChange} value={selectedOption || defaultValue}
							className="react-select-container"
							classNamePrefix="react-select"/>
				</div>
				<div className="new-expense__control new-expense__controlDate">
					<label htmlFor="">날짜</label>
					<DatePicker
						showIcon
						selected={startDate}
						onChange={dateChangeHandler}
						dateFormat="yyyy년 MM월 dd일"
					/>
				</div>
				<div className="new-expense__actions">
					<button type="button" className={"controls__button"} onClick={handleCancelButtonClick}>초기화</button>
					{props.expensesSelected.length === 0 && <button type="submit" className={"controls__button"} onClick={(event) => {
						event.preventDefault();
						handleAddExpense();
					}}>작성</button>}
					{props.expensesSelected.length > 0 && <button type="submit" className={"controls__button"}  onClick={(event) => {
						event.preventDefault();
						handleModifyExpense();
					}}>수정</button>}
				</div>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		expenses: state.expenses,
		expensesSelected : state.expensesSelected,
		expensesForm_plusCategory: state.expensesForm_plusCategory,
		expensesForm_minusCategory: state.expensesForm_minusCategory,
		isOpenExpensesForm: state.isOpenExpensesForm,
		expensesUpdateFlag: state.expensesUpdateFlag,
		expensesSetArr: state.expensesSetArr,
		yearSelected: state.yearSelected,
		isAlertPopup: state.isAlertPopup,
		isAlertPopupMessage: state.isAlertPopupMessage,
		yearSelectedBefore: state.yearSelectedBefore,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		expensesAdd: (expenseData) => dispatch(expensesAdd(expenseData)),
		expensesDelete: (expenseData) => dispatch(expensesDelete(expenseData)),
		expensesModify: (expenseData) => dispatch(expensesModify(expenseData)),
		expensesSelect: (expenseData) => dispatch(expensesSelect(expenseData)),
		expensesClick: (boo) => dispatch(expensesClick(boo)),
		alertPopupState: (boo) => dispatch(alertPopupState(boo)),
		alertPopupMessage: (str) => dispatch(alertPopupMessage(str)),
		expenseUpdateFlag: (boo) => dispatch(expenseUpdateFlag(boo)),
		expensesSet: (expenseData) => dispatch(expensesSet(expenseData)),
		yearSelect: (str) => dispatch(yearSelect(str)),
		yearSelectBefore: (str) => dispatch(yearSelectBefore(str)),
	};
};

//export default ExpenseForm;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);