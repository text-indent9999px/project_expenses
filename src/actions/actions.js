// actions.js

export const expensesAdd = (data) => ({
    type: 'EXPENSES_ADD',
    payload: data,
});

export const expensesDelete = (data) => ({
    type: 'EXPENSES_DELETE',
    payload: data,
});

export const expensesModify = (data) => ({
    type: 'EXPENSES_MODIFY',
    payload: data,
});

export const expensesSelect = (data) => ({
    type: 'EXPENSES_SELECT',
    payload: data,
});

export const expensesSet = (arr) => ({
    type: 'EXPENSES_SET',
    payload: arr,
});

export const expensesClick = (boo) => ({
    type: 'EXPENSES_CLICK',
    payload: boo,
});

export const yearSelect = (str) => ({
    type: 'YEAR_SELECT',
    payload: str,
});

export const yearSelectBefore = (str) => ({
    type: 'YEAR_SELECT_BEFORE',
    payload: str,
});

export const expenseUpdateFlag = (boo) => ({
    type: 'EXPENSES_UPDATE_FLAG',
    payload: boo,
});

export const alertPopupState = (boo) => ({
    type: 'ALERT_POPUP_STATE',
    payload: boo,
});

export const alertPopupMessage = (str) => ({
    type: 'ALERT_POPUP_MESSAGE',
    payload: str,
});

export const alertPopupOk = (boo) => ({
    type: 'ALERT_POPUP_OK',
    payload: boo,
});

export const alertPopupCancel = (boo) => ({
    type: 'ALERT_POPUP_CANCEL',
    payload: boo,
});
