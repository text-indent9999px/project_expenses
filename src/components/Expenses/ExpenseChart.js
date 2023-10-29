import React, {useEffect, useState} from "react";
import Chart from "../Chart/Chart";
import {connect} from "react-redux";
import {expensesSet, yearSelect} from "../../actions/actions";

const ExpenseChart = (props) => {

	const [dataCheck, setDataCheck] = useState(false);
	const [chartDataPoints, setDataChartDataPoints] = useState([]);

	useEffect(() => {
		if (props.expensesSetArr.length > 0) {
			const newArr = Array.from({ length: 12 }, (_, i) => ({
				label: `${i + 1}월`,
				plus: 0,
				minus: 0,
				key: `${props.yearSelected}${i}`,
			}));
			props.expensesSetArr.forEach((e) => {
				const month = new Date(e.date).getMonth();
				const amount = Number(e.amount);
				newArr[month][e.amountType] += amount;
			});
			setDataCheck(true);
			setDataChartDataPoints(newArr);
		} else {
			const newArr = Array.from({ length: 12 }, (_, i) => ({
				label: `${i + 1}월`,
				plus: 0,
				minus: 0,
				key: `9999${i}`,
			}));
			setDataChartDataPoints(newArr);
			setDataCheck(false);
		}
	}, [props.expensesSetArr]);

	return <Chart className={`${props.className} ${dataCheck ? '' : 'chart_nodata'}`}
				  chartData={chartDataPoints} />
}

const mapStateToProps = (state) => {
	return {
		expenses: state.expenses,
		expensesSetArr: state.expensesSetArr,
		yearSelected: state.yearSelected,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		expensesSet: (expenseData) => dispatch(expensesSet(expenseData)),
		yearSelect: (str) => dispatch(yearSelect(str)),
	};
};


//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseChart);
