import React from "react";
import './ExpenseItem.css'
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import CurrencyDisplay from "../Common/CurrencyDisplay";

const ExpenseItem = (props) => {

	const deleteClick = () => {
		const userConfirmed = window.confirm("정말 삭제하시겠습니까?");
		if(userConfirmed){
			props.onDeleteExpense(props.data);
		}
	};

	const modifyClick = () => {
		props.onModifyExpense(props.data);
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // You can use 'auto' or 'smooth' for scrolling behavior
		});
	};


	if(props.id == 'dummy'){
		return (
			<li>
				<Card className="expense-item">
					<div>
						가계부 항목을 추가해주세요.
					</div>
				</Card>
			</li>
		)
	}else{
		return (
			<li>
				<Card className={`expense-item ${props.amountType == 'plus' ? 'expense-item__plus' : 'expense-item__minus'}`}>
					<ExpenseDate date={props.date}/>
					<div className="expense-item__description">
						<span>{props.category}</span>
						<h2>{props.title}</h2>
						<div className="expense-item__price">{`${props.amountType == 'plus' ? '+' : '-'}`} <CurrencyDisplay amount={`${props.amount}`}/></div>
					</div>
					<div className="expense-item__buttons">
						<div className="expense-item__modify controls__button" onClick={modifyClick}>수정</div>
						<div className="expense-item__delete controls__button" onClick={deleteClick}>삭제</div>
					</div>
				</Card>
			</li>
		)
	}
}
export default ExpenseItem;