// reducers.js


import {yearSelect} from "../actions/actions";

const initialState = {
    expenses: [
        {
            "id": "1697305566024",
            "title": "테스트1-월급",
            "amount": "3000000",
            "date": "2020-10-13",
            "amountType": "plus",
            "category": "근로수입"
        },
        {
            "id": "1697305581816",
            "title": "테스트2-미용실",
            "amount": "30000",
            "date": "2020-11-13",
            "amountType": "minus",
            "category": "기타지출"
        },
        {
            "id": "1697305572054",
            "title": "테스트3-간식",
            "amount": "5000",
            "date": "2020-12-13",
            "amountType": "minus",
            "category": "기타지출"
        },
        {
            "id": "1697305585555",
            "title": "테스트4-미용실",
            "amount": "30000",
            "date": "2021-11-13",
            "amountType": "minus",
            "category": "기타지출"
        },
        {
            "id": "1697305576666",
            "title": "테스트5-간식",
            "amount": "5000",
            "date": "2021-11-13",
            "amountType": "minus",
            "category": "기타지출"
        },
    ],
    expensesSelected: [],
    expensesSetArr: [],
    yearSelected : 0,
    yearSelectedBefore: 0,
    expensesUpdateFlag: false,
    expensesForm_plusCategory: [
        { value: '근로수입', label: '근로수입' },
        { value: '비근로수입', label: '비근로수입' },
        { value: '기타수입', label: '기타수입' }
    ],
    expensesForm_minusCategory: [
        { value: '생활비', label: '생활비' },
        { value: '고정비', label: '고정비' },
        { value: '경조사비', label: '경조사비' },
        { value: '여행비', label: '여행비' },
        { value: '세금', label: '세금' },
        { value: '기타지출', label: '기타지출' }
    ],
    isOpenExpensesForm : false,
    isAlertPopup : false,
    isAlertPopupMessage : '',
    isAlertPopupOk : false,
    isAlertPopupCancel : false,
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXPENSES_CLICK':
            return { ...state, isOpenExpensesForm: action.payload };
        case 'EXPENSES_ADD':
            return { ...state, expenses: [...state.expenses, action.payload] };
        case 'EXPENSES_DELETE':
            const updatedExpensesAfterDelete = state.expenses.filter(expense => expense.id !== action.payload.id);
            return { ...state, expenses: updatedExpensesAfterDelete };
        case 'EXPENSES_MODIFY':
            const updatedExpensesAfterModify = state.expenses.reduce((accumulator, expense) => {
                if (expense.id === action.payload.id) {
                    accumulator.push(action.payload);
                } else {
                    accumulator.unshift(expense);
                }
                return accumulator;
            }, []);
            return { ...state, expenses: updatedExpensesAfterModify };
        case 'EXPENSES_SELECT':
            return { ...state, expensesSelected: action.payload };
        case 'EXPENSES_SET':
            return { ...state, expensesSetArr: action.payload };
        case 'ALERT_POPUP_STATE':
            return { ...state, isAlertPopup: action.payload };
        case 'YEAR_SELECT':
            return { ...state, yearSelected: String(action.payload) };
        case 'YEAR_SELECT_BEFORE':
            return { ...state, yearSelectedBefore: String(action.payload) };
        case 'EXPENSES_UPDATE_FLAG':
            return { ...state, expensesUpdateFlag: action.payload };
        case 'ALERT_POPUP_MESSAGE':
            return { ...state, isAlertPopupMessage: action.payload };
        case 'ALERT_POPUP_CANCEL':
            return { ...state, isAlertPopupCancel: action.payload };
        case 'ALERT_POPUP_OK':
            return { ...state, isAlertPopupOk: action.payload };
        default:
            return state;
    }
};

export default rootReducer;