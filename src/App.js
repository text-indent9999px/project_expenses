import React, { useState, useRef, useEffect } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { connect } from 'react-redux';
import AlertPopup from "./components/Common/AlertPopup";

const App = (props) => {

	return (
		<>
			<NewExpense />
			<Expenses />
			<AlertPopup />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};


//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
