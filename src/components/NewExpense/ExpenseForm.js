import React, { useState, useRef, useEffect } from "react";
import './ExpenseForm.css'
const ExpenseForm = (props) => {
	const contentRef = useRef();
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		setContentHeight(props.isClicked ? contentRef.current.scrollHeight + "px" : "0");
	}, [props.isClicked]);

	const handleCancelButtonClick = () => {
		setTitle('');
		setAmount('');
		setDate('');

		// "Cancel" 버튼 클릭 시 상위 컴포넌트의 이벤트 핸들러 호출
		props.onButtonClick();
	};

	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");

	const handleAddExpense = () => {
		// 입력된 데이터를 최상위 컴포넌트로 전달
		props.onAddExpense({ title, amount, date });
	};

	return (
		<form className={`new-expense__form ${props.isClicked ? 'new-expense__form--clicked' : ''}`} style={{ maxHeight: contentHeight }}>
			<div className="new-expense__controls" ref={contentRef}>
				<div className="new-expense__control">
					<label htmlFor="">Title</label>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className="new-expense__control">
					<label htmlFor="">Amount</label>
					<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
				<div className="new-expense__control">
					<label htmlFor="">Date</label>
					<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
				</div>
				<div className="new-expense__actions">
					<button type="button" onClick={handleCancelButtonClick}>Cancel</button>
					<button type="submit" onClick={(event) => {
						event.preventDefault();
						handleAddExpense();
					}}>Add Expense</button>
				</div>
			</div>
		</form>
	);
};
export default ExpenseForm;