import React, { useState, useRef, useEffect } from "react";
import './ExpenseFilter.css'
import Select from 'react-select';

const ExpenseFilter = (props) => {
	const [inputYear, setInputYear] = useState(""); // 상태값으로 초기 inputYear를 설정
	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		if (props.items.length > 0) {
			const data = props.items;
			const lastInputYear = new Date(data[data.length-1]['date']).getFullYear();
			setInputYear(lastInputYear);
			props.onFilterChange(String(lastInputYear)); // 선택된 값을 상위 컴포넌트로 전달
			let selectedOptionChk = optionsReal.filter(function(e){
				if(e.value == lastInputYear){
					return true;
				}
			})
			setSelectedOption(selectedOptionChk);
		}else{
			setInputYear('9999');
			props.onFilterChange(String('9999')); // 선택된 값을 상위 컴포넌트로 전달
		}
	}, [props.items]);

	const uniqueYears = props.items.length > 0 ? [...new Set(props.items.map(item => new Date(item.date)) // item.date를 날짜 객체로 변환
		.filter(date => !isNaN(date.getTime())) // 올바른 날짜인지 확인
		.map(date => date.getFullYear())
		.sort((a, b) => a - b) // 년도를 오름차순으로 정렬
	)] : [];

	const optionsDummy = [
		{ value: '9999', label: '9999' },
	];

	const optionsReal = uniqueYears.map((year) => (
		{value: String(year), label: String(year)}
	));

	const dynamicOptions = props.items.length == 0 ? optionsDummy : optionsReal;
	const defaultValue = dynamicOptions[0]; // 예: Option 2를 기본값으로 설정
	const handleFilterChange = (selectedOption) => {
		//const selectedYear = event.target.value;
		setSelectedOption(selectedOption);
		setInputYear(selectedOption.value); // inputYear 상태 업데이트
		props.onFilterChange(selectedOption.value); // 선택된 값을 상위 컴포넌트로 전달
	};

	return (
		<div className="expenses-filter">
			<div className="expenses-filter__control">
				<label>연도별 보기</label>
				{/*<select name="" id="" value={inputYear} onChange={handleFilterChange}>
					{props.items.length === 0 && <option key={'9999'} value={'9999'}>-</option>}
					{props.items.length > 0 && uniqueYears.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>*/}
				<Select options={dynamicOptions} className="react-select-container" classNamePrefix="react-select" onChange={handleFilterChange} value={selectedOption || defaultValue}/>
			</div>
		</div>
	)
}
export default ExpenseFilter;