import React, {useEffect, useState} from 'react';
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
		props.onCancelButtonClick();
	};

	useEffect(() => {
		if(props.items.length > 0){
			setIsClicked(true);
		}else{
			setIsClicked(false);
		}
	}, [props.items]);

	return (
		<div className="new-expense">
			<button className={`new-expense__button ${isClicked ? 'new-expense__button--clicked' : ''} controls__button`}
					onClick={handleClick}>
				작성하기
			</button>
			<ExpenseForm isClicked={isClicked}
						 onButtonClick={handleCancelButtonClick}
						 onAddExpense={props.onAddExpense}
						 onModifyExpense={props.onModifyExpense}
						 items={props.items}
			/>
		</div>
	)
}
export default NewExpense;