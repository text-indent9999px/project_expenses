import React, { useState, useRef, useEffect } from "react";
import './ExpenseFilter.css'
const ExpenseFilter = (props) => {
	const [inputYear, setInputYear] = useState(""); // 상태값으로 초기 inputYear를 설정

	useEffect(() => {
		if (props.items.length > 0) {
			const data = props.items;
			const lastInputYear = new Date(data[data.length-1]['date']).getFullYear();
			setInputYear(lastInputYear);
			props.onFilterChange(String(lastInputYear)); // 선택된 값을 상위 컴포넌트로 전달
		}
	}, [props.items]);

	const uniqueYears = props.items.length > 0 ? [...new Set(props.items.map(item => new Date(item.date)) // item.date를 날짜 객체로 변환
		.filter(date => !isNaN(date.getTime())) // 올바른 날짜인지 확인
		.map(date => date.getFullYear())
		.sort((a, b) => a - b) // 년도를 오름차순으로 정렬
	)] : [];

	const handleFilterChange = (event) => {
		const selectedYear = event.target.value;
		setInputYear(selectedYear); // inputYear 상태 업데이트
		props.onFilterChange(selectedYear); // 선택된 값을 상위 컴포넌트로 전달
	};

	return (
		<div className="expenses-filter">
			<div className="expenses-filter__control">
				<label>Filter by year</label>
				<select name="" id="" value={inputYear} onChange={handleFilterChange}>
					{props.items.length === 0 && <option>-</option>}
					{props.items.length > 0 && uniqueYears.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
export default ExpenseFilter;