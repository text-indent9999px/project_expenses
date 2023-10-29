import React, {useEffect, useState} from "react";
import './AlertPopup.css';
import { connect } from 'react-redux';
import {alertPopupCancel, alertPopupMessage, alertPopupOk, alertPopupState} from "../../actions/actions";
function AlertPopup(props) {

    useEffect(() => {
        if(props.isAlertPopupCancel){
            props.alertPopupState(false);
            props.alertPopupCancel(false);
        }
    }, [props.isAlertPopupCancel]);

    useEffect(() => {
        if(props.isAlertPopupOk){
            props.alertPopupState(false);
            props.alertPopupOk(false);
        }
    }, [props.isAlertPopupOk]);

    return (
        <>
            <div className={`popup popup-alert ${props.isAlertPopup ? 'is-active' : ''}`}>
                {props.isAlertPopup === true && <>
                    <div className="popup-inner">
                        <div className="header">
                            <h3>알림</h3>
                        </div>
                        <div className="body">{props.isAlertPopupMessage}</div>
                        <div className="footer">
                            {props.isAlertPopupMessage.indexOf('?') > -1 &&
                                <button className="controls__button"
                                        onClick={(e) => {props.alertPopupCancel(true);}}>취소</button>}
                            <button className="controls__button"
                                    onClick={(e) => {
                                        props.alertPopupOk(true);
                                    }}
                            >확인</button>
                        </div>
                    </div>
                </>
                }
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAlertPopup: state.isAlertPopup,
        isAlertPopupMessage: state.isAlertPopupMessage,
        isAlertPopupOk : state.isAlertPopupOk,
        isAlertPopupCancel : state.isAlertPopupCancel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        alertPopupState: (boo) => dispatch(alertPopupState(boo)),
        alertPopupMessage: (str) => dispatch(alertPopupMessage(str)),
        alertPopupOk: (boo) => dispatch(alertPopupOk(boo)),
        alertPopupCancel: (boo) => dispatch(alertPopupCancel(boo)),
    };
};


//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(AlertPopup);