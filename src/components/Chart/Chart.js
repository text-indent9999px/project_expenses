import React from "react";
import './Chart.css';
import ChartBar from "./ChartBar";
const Chart = (props) => {

	let data = props.items;
	const values = data.map((dataItem) => dataItem.value);
	const maxValue = Math.max(...values);

	// data 배열을 매핑하여 ChartBar 컴포넌트 생성
	const chartBars = data.map((dataItem) => (
		<ChartBar
			key={dataItem.key}
			value={dataItem.value}
			label={dataItem.label}
			maxValue={maxValue}
		/>
	));
	return <div className="chart">{chartBars}</div>;
}
export default Chart;