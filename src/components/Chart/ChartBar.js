import React, { useState, useEffect } from "react";
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
	if(isNaN(percent)){
		percent = 0;
	}
	if(props.value > 0 && percent < 10){
		percent = 10;
	}

	const [fillStyles, setFillStyles] = useState({
		height: '0',
		width: '0',
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setFillStyles({
				height: `${percent}%`,
				width: `${percent}%`,
			});
		}, 200);
		return () => {
			clearTimeout(timer);
		};
	}, [percent]);


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