import React from "react";
import './Chart.css';
import ChartBar from "./ChartBar";
const Chart = (props) => {

	let data = props.items;
	let data2 = props.items2;
	const values = data.map((dataItem) => dataItem.value);
	const values2 = data2.map((dataItem) => dataItem.value);
	const maxValue = Math.max(...values);
	const maxValue2 = Math.max(...values2);

	if(props.className == 'expense_chart__plus'){
		const chartBars2 = data2.map((dataItem) => (
			<ChartBar
				key={dataItem.key}
				value={dataItem.value}
				label={dataItem.label}
				maxValue={maxValue2}
			/>
		));
		return <div className={`chart ${props.className}`}>{chartBars2}</div>;

	}else{
		// data 배열을 매핑하여 ChartBar 컴포넌트 생성
		const chartBars = data.map((dataItem) => (
			<ChartBar
				key={dataItem.key}
				value={dataItem.value}
				label={dataItem.label}
				maxValue={maxValue}
			/>
		));
		return <div className={`chart ${props.className}`}>{chartBars}</div>;
	}
}
export default Chart;