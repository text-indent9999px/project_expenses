import React, {useEffect, useState} from 'react';
import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import DraggablePanel from "../Common/DraggablePanel";
const NewExpense = (props) => {

	return (
		<DraggablePanel>
			<div className="new-expense">
				<ExpenseForm />
			</div>
		</DraggablePanel>
	)
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);