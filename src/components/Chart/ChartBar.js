import React from "react";
import './ChartBar.css'
const ChartBar = (props) => {

	let maxValue = 0;
	let maxValueStep1 = 113;
	let inValueMaxValue = Math.round(props.maxValue);
	let maxValueStep2 = 300;

	maxValue = maxValueStep1;

	if(inValueMaxValue > maxValueStep1){
		maxValue = inValueMaxValue + 50;
	}
	if(maxValue > maxValueStep2){
		maxValue = maxValueStep2;
	}

	let percent = Math.round((props.value)/maxValue * 100);
	if(percent > 100){
		percent = 100;
	}

	const fillStyles = {
		height: `${percent}%`,
	};

	return (
		<div className="chart-bar">
			<div className="chart-bar__inner">
				<div className="chart-bar__fill" style={fillStyles}></div>
			</div>
			<div className="chart-bar__label">{props.label}</div>
		</div>
	)
}
export default ChartBar;