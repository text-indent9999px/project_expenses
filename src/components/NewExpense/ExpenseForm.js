import React, { useState, useRef, useEffect } from "react";
import './ExpenseForm.css'
const ExpenseForm = (props) => {
	const contentRef = useRef();
	const [contentHeight, setContentHeight] = useState(0);
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [amountText, setAmountText] = useState("");
	const [date, setDate] = useState("");
	const [category, setCategory] = useState("근로수입");
	const [amountType, setAmountType] = useState('plus');

	useEffect(() => {
		setContentHeight(props.isClicked ? contentRef.current.scrollHeight + "px" : "0");
	}, [props.isClicked]);

	useEffect(() => {
		if(props.items.length > 0){
			setTitle(props.items[0].title);
			setAmount(props.items[0].amount);
			let tempAmount = props.items[0].amount;
			tempAmount = tempAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			setAmountText(tempAmount);
			setDate(props.items[0].date);
			setAmountType(props.items[0].amountType);
			setCategory(props.items[0].category);
		}else{
			setTitle('');
			setAmount('');
			setAmountText('');
			setDate('');
			setAmountType('plus');
			setCategory('근로수입');
		}
	}, [props.items]);

	useEffect(() => {
		setAmount(amountText.replace(/,/g, ''));
	}, [amountText]);

	useEffect(() => {
		if(amountType == 'plus'){
			setCategory('근로수입');
		}else{
			setCategory('생활비');
		}
	}, [amountType]);

	const handleCancelButtonClick = () => {
		setTitle('');
		setAmount('');
		setAmountText('');
		setDate('');
		setAmountType('plus');
		setCategory('근로수입');

		// "Cancel" 버튼 클릭 시 상위 컴포넌트의 이벤트 핸들러 호출
		props.onButtonClick();
	};

	const handleAddExpense = () => {
		// 입력된 데이터를 최상위 컴포넌트로 전달
		if (title.trim() !== '' && amount > 0 && date.trim() !== '') {
			props.onAddExpense({ title, amount, date, amountType, category });
			setTitle('');
			setAmount('');
			setAmountText('');
			setDate('');
			setAmountType('plus');
			setCategory('근로수입');
		}else{
			alert('입력 항목을 확인해 주세요.');
		}
	};

	const handleModifyExpense = () => {
		// 입력된 데이터를 최상위 컴포넌트로 전달
		let id = props.items[0].id;
		if (title.trim() !== '' && amount > 0 && date.trim() !== '') {
			props.onModifyExpense({ id, title, amount, date, amountType, category});
			setTitle('');
			setAmount('');
			setAmountText('');
			setDate('');
			setAmountType('plus');
			setCategory('근로수입');
		}else{
			alert('입력 항목을 확인해 주세요.');
		}
	};

	// 라디오 버튼 값이 변경될 때 호출되는 핸들러 함수
	const handleAmountTypeChange = (event) => {
		setAmountType(event.target.value);
	};

	const handleSelectChange = (event) => {
		const selectCategory = event.target.value;
		setCategory(selectCategory);
	}

	const handleAmountChange = (event) => {
		const inputValue = event.target.value;

		// 입력된 값에서 숫자만 추출
		const numberPattern = /\d+/g;
		const numbers = inputValue.match(numberPattern);
		// 추출된 숫자 배열을 문자열로 결합
		const result = numbers ? numbers.join('') : '';
		const commaResult = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		setAmountText(commaResult);
	}




	return (
		<form className={`new-expense__form ${props.isClicked ? 'new-expense__form--clicked' : ''}`} style={{ maxHeight: contentHeight }}>
			<div className="new-expense__controls" ref={contentRef}>
				<div className="new-expense__control new-expense__controlTitle">
					<label htmlFor="">내용</label>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className="new-expense__control new-expense__controlAmount">
					<label htmlFor="">비용</label>
					<input type="text" value={amountText} onChange={handleAmountChange} />
					<div className="new-expense__amountType">
						<input type="radio" value="plus" name="amountType" id="amountTypeP" checked={amountType === 'plus'}
							   onChange={handleAmountTypeChange} />
						<label htmlFor="amountTypeP">수입</label>
						<input type="radio" value="minus" name="amountType" id="amountTypeM"
							   checked={amountType === 'minus'}
							   onChange={handleAmountTypeChange} />
						<label htmlFor="amountTypeM">지출</label>
					</div>
				</div>
				<div className="new-expense__control new-expense__controlCategory">
					<label htmlFor="">분류</label>
					{/*<input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />*/}
					<select value={category} onChange={handleSelectChange} >
						{amountType == 'plus' && <>
							<option value="근로수입">근로수입</option>
							<option value="비근로수입">비근로수입</option>
							<option value="기타수입">기타수입</option>
						</>
						}
						{amountType == 'minus' && <>
							<option value="생활비">생활비</option>
							<option value="고정비">고정비</option>
							<option value="경조사비">경조사비</option>
							<option value="여행비">여행비</option>
							<option value="세금">세금</option>
							<option value="기타지출">기타지출</option>
						</>
						}
					</select>
				</div>
				<div className="new-expense__control new-expense__controlDate">
					<label htmlFor="">날짜</label>
					<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
				</div>
				<div className="new-expense__actions">
					<button type="button" onClick={handleCancelButtonClick}>취소</button>
					{props.items.length === 0 && <button type="submit" onClick={(event) => {
						event.preventDefault();
						handleAddExpense();
					}}>작성</button>}
					{props.items.length > 0 && <button type="submit" onClick={(event) => {
						event.preventDefault();
						handleModifyExpense();
					}}>수정</button>}
				</div>
			</div>
		</form>
	);
};
export default ExpenseForm;