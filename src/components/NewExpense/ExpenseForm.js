import React, { useState, useRef, useEffect } from "react";
import './ExpenseForm.css';
import Select from 'react-select';


const ExpenseForm = (props) => {
	const contentRef = useRef();
	const [contentHeight, setContentHeight] = useState(0);
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [amountText, setAmountText] = useState("");
	const [date, setDate] = useState("");
	const [category, setCategory] = useState("근로수입");
	const [amountType, setAmountType] = useState('plus');
	const [selectedOption, setSelectedOption] = useState(null);
	const [tempChk, setTempChk] = useState(false);

	// 동적으로 생성할 옵션 배열
	const optionsPlus = [
		{ value: '근로수입', label: '근로수입' },
		{ value: '비근로수입', label: '비근로수입' },
		{ value: '기타수입', label: '기타수입' }
	];

	const optionsMinus = [
		{ value: '생활비', label: '생활비' },
		{ value: '고정비', label: '고정비' },
		{ value: '경조사비', label: '경조사비' },
		{ value: '여행비', label: '여행비' },
		{ value: '세금', label: '세금' },
		{ value: '기타지출', label: '기타지출' }
	];

	// state 또는 다른 조건에 따라 옵션 배열 선택
	const dynamicOptions = amountType === 'plus' ? optionsPlus : optionsMinus;

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

			if(props.items[0].amountType == 'plus'){
				let selectedOptionChk = optionsPlus.filter(function(e){
					if(e.value == props.items[0].category){
						return true;
					}
				})
				setSelectedOption(selectedOptionChk);
			}else{
				let selectedOptionChk = optionsMinus.filter(function(e){
					if(e.value == props.items[0].category){
						return true;
					}
				})
				setSelectedOption(selectedOptionChk);
			}
			setTempChk(true);
		}else{
			setTitle('');
			setAmount('');
			setAmountText('');
			setDate('');
			setAmountType('plus');
			setCategory('근로수입');
			setTempChk(false);
		}
	}, [props.items]);

	useEffect(() => {
		setAmount(amountText.replace(/,/g, ''));
	}, [amountText]);

	useEffect(() => {
		if(amountType == 'plus'){
			setCategory('근로수입');
			if(props.items.length == 0){
				setSelectedOption(optionsPlus[0]);
			}else if(props.items.length > 0 && tempChk == false){
				setSelectedOption(optionsPlus[0]);
			}else{
				setTempChk(false);
			}
		}else{
			setCategory('생활비');
			if(props.items.length == 0){
				setSelectedOption(optionsMinus[0]);
			}else if(props.items.length > 0 && tempChk == false){
				setSelectedOption(optionsMinus[0]);
			}else{
				setTempChk(false);
			}
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

	const handleSelectChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		setCategory(selectedOption.value);
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

	// 원하는 값을 선택
	const defaultValue = dynamicOptions[0]; // 예: Option 2를 기본값으로 설정



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
						<label htmlFor="amountTypeP" className={"controls__button"}>수입</label>
						<input type="radio" value="minus" name="amountType" id="amountTypeM"
							   checked={amountType === 'minus'}
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
					<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
				</div>
				<div className="new-expense__actions">
					<button type="button" className={"controls__button"} onClick={handleCancelButtonClick}>취소</button>
					{props.items.length === 0 && <button type="submit" className={"controls__button"} onClick={(event) => {
						event.preventDefault();
						handleAddExpense();
					}}>작성</button>}
					{props.items.length > 0 && <button type="submit" className={"controls__button"}  onClick={(event) => {
						event.preventDefault();
						handleModifyExpense();
					}}>수정</button>}
				</div>
			</div>
		</form>
	);
};
export default ExpenseForm;