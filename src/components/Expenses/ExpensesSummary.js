import React, {useState} from "react";
import './ExpensesSummary.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCoins } from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {
    alertPopupState,
    expensesAdd,
    expensesClick,
    expensesDelete,
    expensesModify,
    expensesSelect, expensesSet, expenseUpdateFlag, yearSelect
} from "../../actions/actions";
import CurrencyDisplay from "../Common/CurrencyDisplay";

const ExpensesSummary = (props) => {

    let plus = 0;
    let minus = 0;
    let total = 0;

    props.expensesSetArr.forEach((e) => {
        const amount = Number(e.amount);
        const withAmountType = (e.amountType == 'plus') ? amount : -1*(amount);
        if((e.amountType == 'plus')){
            plus += amount;
        }else{
            minus += amount;
        }
        total += withAmountType;
    });

    return (
        <div className={`expenses-summary ${props.expensesSetArr.length == 0 ? 'summary-nodata' : ''}`}>
            <ul>
                <li className="expenses-summary__plus">
                    <FontAwesomeIcon icon={faPlus} />
                    <div className="expenses-summary__text">
                        <h3>수입 합계</h3>
                        <strong>+ <CurrencyDisplay amount={`${plus}`}/></strong>
                    </div>
                </li>
                <li className="expenses-summary__minus">
                    <FontAwesomeIcon icon={faMinus} />
                    <div className="expenses-summary__text">
                        <h3>지출 합계</h3>
                        <strong>- <CurrencyDisplay amount={`${minus}`}/></strong>
                    </div>
                </li>
                <li className="expenses-summary__total">
                    <FontAwesomeIcon icon={faCoins} />
                    <div className="expenses-summary__text">
                        <h3>연간 잔액</h3>
                        <strong>= {`${(total < 0 ) ? '-' : ''} `}<CurrencyDisplay amount={`${Math.abs(total)}`}/></strong>
                    </div>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        expensesSelected : state.expensesSelected,
        expensesForm_plusCategory: state.expensesForm_plusCategory,
        expensesForm_minusCategory: state.expensesForm_minusCategory,
        isOpenExpensesForm: state.isOpenExpensesForm,
        isAlertPopup: state.isAlertPopup,
        expensesUpdateFlag: state.expensesUpdateFlag,
        expensesSetArr: state.expensesSetArr,
        yearSelected: state.yearSelected,
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
        expenseUpdateFlag: (boo) => dispatch(expenseUpdateFlag(boo)),
        expensesSet: (expenseData) => dispatch(expensesSet(expenseData)),
        yearSelect: (str) => dispatch(yearSelect(str)),
    };
};


//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesSummary);