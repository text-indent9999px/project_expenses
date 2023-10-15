import React, { useState } from 'react';
import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {

	const [isClicked, setIsClicked] = useState(false);
	const handleClick = () => {
		setIsClicked(!isClicked);
	};
	const handleCancelButtonClick = () => {
		// "Cancel" 버튼 클릭 시 isClicked 값을 변경
		setIsClicked(false);
	};

	return (
		<div className="new-expense">
			<button className={`new-expense__button ${isClicked ? 'new-expense__button--clicked' : ''}`}
					onClick={handleClick}>
				Add New Expense
			</button>
			<ExpenseForm isClicked={isClicked} onButtonClick={handleCancelButtonClick} onAddExpense={props.onAddExpense}/>
		</div>
	)
}
export default NewExpense;