import React, {useEffect, useState} from "react";
import './ExpenseItem.css'
import Card from "../UI/Card";
import CurrencyDisplay from "../Common/CurrencyDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";

import { connect } from 'react-redux';
import {
	expensesAdd,
	expensesModify,
	expensesDelete,
	expensesSelect,
	expensesClick,
	alertPopupState, alertPopupMessage, expenseUpdateFlag, yearSelect, expensesSet, yearSelectBefore
} from "../../actions/actions";

const ExpenseItem = (props) => {

	let data = props.data;
	const [deleteChkData, setDeleteChkData] = useState({});

	const deleteClick = (event) => {
		props.alertPopupState(true);
		props.alertPopupMessage('정말 삭제하시겠습니까?');
		setDeleteChkData(Object.assign({}, data));
	};

	useEffect(() => {
		if(props.isAlertPopupOk){
			if(typeof deleteChkData.date !== "undefined"){
				props.yearSelectBefore(props.yearSelected);
				props.expensesDelete(deleteChkData);
				props.expensesSelect([]);
				props.expenseUpdateFlag(true);
			}
		}
	}, [props.isAlertPopupOk]);

	const modifyClick = (event) => {
		props.expensesSelect([props.data]);
		props.expensesClick(true);
	};


	if(props.id == 'dummy'){
		return (
			<li className="expense-item-li expense-item-li-dummy">
				<Card className="expense-item">
					<p>가계부 항목을 추가해주세요.</p>
					<div className="controls__actions">
						<div className="controls__button"
							 onClick={(e) => props.expensesClick(true)}>
							추가하기
						</div>
					</div>
				</Card>
			</li>
		)
	}else{
		return (
			<li className="expense-item-li">
				<Card className={`expense-item ${props.amountType == 'plus' ? 'expense-item__plus' : 'expense-item__minus'}`}>
					<div className="expense-item__description">
						<span>{props.category}</span>
						<h2>{props.title}</h2>
						<div className="expense-item__price">{`${props.amountType == 'plus' ? '+' : '-'}`} <CurrencyDisplay amount={`${props.amount}`}/></div>
					</div>
					<div className="expense-item__buttons">
						<div className="expense-item__modify controls__button" onClick={modifyClick}><FontAwesomeIcon icon={faPen} /></div>
						<div className="expense-item__delete controls__button" onClick={deleteClick}><FontAwesomeIcon icon={faX} /></div>
					</div>
				</Card>
			</li>
		)
	}
}
//export default ExpenseItem;

const mapStateToProps = (state) => {
	return {
		expenses: state.expenses,
		expensesSelected : state.expensesSelected,
		isOpenExpensesForm: state.isOpenExpensesForm,
		isAlertPopup: state.isAlertPopup,
		isAlertPopupMessage: state.isAlertPopupMessage,
		expensesUpdateFlag: state.expensesUpdateFlag,
		yearSelected: state.yearSelected,
		isAlertPopupOk : state.isAlertPopupOk,
		isAlertPopupCancel : state.isAlertPopupCancel,
		expensesSetArr: state.expensesSetArr,
		yearSelectedBefore: state.yearSelectedBefore,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		expensesAdd: (expenseData) => dispatch(expensesAdd(expenseData)),
		expensesDelete: (expenseData) => dispatch(expensesDelete(expenseData)),
		expensesModify: (expenseData) => dispatch(expensesModify(expenseData)),
		expensesSelect: (expenseData) => dispatch(expensesSelect(expenseData)),
		expensesClick: (boo) => dispatch(expensesClick(boo)),
		alertPopupState: (boo) => dispatch(alertPopupState(boo)),
		alertPopupMessage: (str) => dispatch(alertPopupMessage(str)),
		expenseUpdateFlag: (boo) => dispatch(expenseUpdateFlag(boo)),
		yearSelect: (str) => dispatch(yearSelect(str)),
		expensesSet: (expenseData) => dispatch(expensesSet(expenseData)),
		yearSelectBefore: (str) => dispatch(yearSelectBefore(str)),
	};
};

//export default ExpenseForm;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);