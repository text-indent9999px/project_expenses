import React, { useState, useEffect, useRef } from 'react';
import './DraggablePanel.css';

import { connect } from 'react-redux';
import {expensesClick, expensesSelect} from "../../actions/actions";


function DraggablePanel(props) {

    const { isOpenExpensesForm } = props;

    const targetRef = useRef(null);
    const dimmedRef = useRef(null);
    const [isOpen, setIsOpen] = useState(props.isOpenExpensesForm);
    let currentPosition = 0;
    let interaction = { offset: 0, time: 0 };
    let gesture = { direction: '', position: 0, time: 0 };

    let startPosition = 0;
    let movePosition = 0;
    let endPosition = 0;

    let dimmed = document.getElementsByClassName('Panel-dimmed')[0];
    let windowHeight = window.innerHeight;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


    useEffect(() => {
        if(! props.isOpenExpensesForm){
            props.expensesSelect([]);
        }
    }, [props.isOpenExpensesForm]);

    const onStart = (e) => {
        let touches = e.touches;
        if (touches && touches.length > 1) return;
        e.preventDefault();

        let pointerPosition = getPosition(e);
        startInteraction(pointerPosition);
        startGesture(pointerPosition);
        startPosition = pointerPosition;
        const $target = targetRef.current;

        $target.classList.add("is-active");
        $target.style.top = calcRelativePosition(pointerPosition) + "px";

        const $dimmed = dimmedRef.current;
        const dimmedBg = Math.max(0.2, Math.min(0.6, 1 - pointerPosition / windowHeight));
        $dimmed.style.backgroundColor = `rgba(0,0,0,${dimmedBg})`;

        const boxShadowColor = `-5px -5px 20px rgba(0, 0, 0, ${dimmedBg + 0.05})`;
        const boxShadowBlur = '5px 5px 20px rgba(186, 190, 204, 1)';
        $target.style.boxShadow = `${boxShadowColor}, ${boxShadowBlur}`;


        if(isMobile){
            window.addEventListener('touchend', onEnd);
            window.addEventListener('touchmove', onMove);
        }else{
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('mousemove', onMove);
        }
    }

    const onMove = (e) => {
        let pointerPosition = getPosition(e);
        movePosition = pointerPosition;
        let direction = pointerPosition < currentPosition ? "up" : "down";
        if (direction !== gesture.direction) {
            startGesture(pointerPosition, direction);
        }
        currentPosition = pointerPosition;
        const $target = targetRef.current;
        $target.style.top = calcRelativePosition(pointerPosition) + "px";

        const $dimmed = dimmedRef.current;
        const dimmedBg = Math.max(0.2, Math.min(0.6, 1 - pointerPosition / windowHeight));
        $dimmed.style.backgroundColor = `rgba(0,0,0,${dimmedBg})`;

        const boxShadowColor = `-5px -5px 20px rgba(0, 0, 0, ${dimmedBg + 0.05})`;
        const boxShadowBlur = '5px 5px 20px rgba(186, 190, 204, 1)';
        $target.style.boxShadow = `${boxShadowColor}, ${boxShadowBlur}`;
    }

    const onEnd = (e) => {
        let now = Date.now();
        let velocity = calcVelocity(gesture, {
            position: currentPosition,
            time: now,
        });

        let pointerPosition = getPosition(e);
        endPosition = pointerPosition;

        //if(Math.abs(startPosition - endPosition) < 3){
            //console.log('pass1');
        //}else{
            if (now - interaction.time < 100) {
                setIsOpen(!isOpen);
                props.expensesClick(!isOpen);
            } else if (velocity > 0.05) {
                setIsOpen(gesture.direction === "up");
                props.expensesClick(gesture.direction === "up");
            } else {
                setIsOpen(currentPosition <= window.innerHeight / 2);
                props.expensesClick(currentPosition <= window.innerHeight / 2);
            }
        //}

        if(isMobile){
            window.removeEventListener('touchend', onEnd);
            window.removeEventListener('touchmove', onMove);
        }else{
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('mousemove', onMove);
        }



        const $target = targetRef.current;
        $target.style.top = "";
        $target.style.boxShadow = '';
        $target.classList.remove("is-active");
        interaction = { offset: 0, time: 0 };
        gesture = { direction: '', position: 0, time: 0 };

        const $dimmed = dimmedRef.current;
        const dimmedBg = Math.max(0.2, Math.min(0.6, 1 - pointerPosition / windowHeight));
        $dimmed.style.backgroundColor = `rgba(0,0,0,${dimmedBg})`;

    }

    const startInteraction = (position) => {
        let targetOffset = targetRef.current.offsetParent.offsetTop;
        let pointerOffset = position - targetRef.current.offsetTop;
        interaction = {
            offset: targetOffset + pointerOffset,
            time: Date.now(),
        };
    };

    const startGesture = (position, direction) => {
        gesture = {
            direction : direction,
            position : position,
            time: Date.now(),
        }
    };

    const getPosition = (e) => {
        if (e.touches && e.touches.length > 0) {
            return e.touches[0].pageY;
        } else if (e.pageY) {
            return e.pageY;
        }else{
            console.log('ㅋㅋ');
        }
    };

    const calcVelocity = (startGesture, endGesture) => {
        const distance = (100 / window.innerHeight) * (startGesture.position - endGesture.position);
        const time = endGesture.time - startGesture.time;
        return Math.abs(distance / time);
    };

    const calcRelativePosition = (position) => {
        return position - interaction.offset;
    };

    return (
        <>
            <div className={`Panel js-panel ${props.isOpenExpensesForm ? 'is-open' : 'is-closed'}`} ref={targetRef}>
                <div className={`Panel-toggle js-draggable`}
                     {...(isMobile ? { onTouchStart: onStart } : { onMouseDown: onStart })}
                ></div>
                {props.children}
            </div>
            <div className="Panel-dimmed" ref={dimmedRef}></div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isOpenExpensesForm: state.isOpenExpensesForm,
        expensesSelected : state.expensesSelected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        expensesClick: (boo) => dispatch(expensesClick(boo)),
        expensesSelect: (expenseData) => dispatch(expensesSelect(expenseData)),
    };
};

//export default ExpenseForm;
export default connect(mapStateToProps, mapDispatchToProps)(DraggablePanel);
