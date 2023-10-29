import React from "react";
import './Chart.css';
import ChartBar from "./ChartBar";
const Chart = (props) => {

	let chartData = props.chartData;
	const values = chartData.map((dataItem) => dataItem.minus);
	const values2 = chartData.map((dataItem) => dataItem.plus);
	const maxValue = Math.max(...values);
	const maxValue2 = Math.max(...values2);

	const isPlusChart = props.className.includes('__plus');
	const chartTitle = isPlusChart ? '수입 차트' : '지출 차트';
	const chartDataKey = isPlusChart ? 'plus' : 'minus';
	const maxValueToUse = isPlusChart ? maxValue2 : maxValue;

	const chartBars = chartData.map((dataItem) => (
		<ChartBar
			key={dataItem.key + chartDataKey}
			id={dataItem.key + chartDataKey}
			value={dataItem[chartDataKey]}
			label={dataItem.label}
			maxValue={maxValueToUse}
		/>
	));

	return (
		<div className={`chart-item ${props.className}`}>
			<strong className="chart-title">{chartTitle}</strong>
			<div className={`chart ${props.className}`}>{chartBars}</div>
		</div>
	);

}
export default Chart;