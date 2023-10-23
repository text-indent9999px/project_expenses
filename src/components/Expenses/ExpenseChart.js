import React from "react";
import Chart from "../Chart/Chart";
const ExpenseChart = (props) => {

	const chartDataPoints = [
		{ label: 'Jan', value: 0 },
		{ label: 'Feb', value: 0 },
		{ label: 'Mar', value: 0 },
		{ label: 'Apr', value: 0 },
		{ label: 'May', value: 0 },
		{ label: 'Jun', value: 0 },
		{ label: 'Jul', value: 0 },
		{ label: 'Aug', value: 0 },
		{ label: 'Sep', value: 0 },
		{ label: 'Oct', value: 0 },
		{ label: 'Nov', value: 0 },
		{ label: 'Dec', value: 0 }
	];

	const chartDataPoints2 = [
		{ label: 'Jan', value: 0 },
		{ label: 'Feb', value: 0 },
		{ label: 'Mar', value: 0 },
		{ label: 'Apr', value: 0 },
		{ label: 'May', value: 0 },
		{ label: 'Jun', value: 0 },
		{ label: 'Jul', value: 0 },
		{ label: 'Aug', value: 0 },
		{ label: 'Sep', value: 0 },
		{ label: 'Oct', value: 0 },
		{ label: 'Nov', value: 0 },
		{ label: 'Dec', value: 0 }
	];


	if(props.items.length > 0){
		props.items.forEach(function(e){
			let month = new Date(e.date).getMonth();
			let amount = Number(e.amount);
			if(e.amountType == 'minus'){
				chartDataPoints[month]['value'] = chartDataPoints[month]['value'] + amount;
			}else{
				chartDataPoints2[month]['value'] = chartDataPoints2[month]['value'] + amount;
			}
		});

		let year = new Date(props.items[0]['date']).getFullYear();
		chartDataPoints.forEach(function(e, i){
			e['key'] = String(year) + i;
		})
		chartDataPoints2.forEach(function(e, i){
			e['key'] = String(year) + i;
		})
	}else{
		let year = '9999';
		chartDataPoints.forEach(function(e, i){
			e['key'] = String(year) + i;
		});
		chartDataPoints2.forEach(function(e, i){
			e['key'] = String(year) + i;
		});
	}

	return <Chart className={props.className} items={chartDataPoints} items2={chartDataPoints2}/>
}
export default ExpenseChart;