import React from "react";
import './ChartBar.css'
import CurrencyDisplay from "../Common/CurrencyDisplay";
const ChartBar = (props) => {

	let maxValue = 0;
	let inValueMaxValue = Math.round(props.maxValue);

	maxValue = inValueMaxValue + inValueMaxValue/3;

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
			<div className="chart-bar__total"><CurrencyDisplay amount={`${props.value}`}/></div>
		</div>
	)
}
export default ChartBar;