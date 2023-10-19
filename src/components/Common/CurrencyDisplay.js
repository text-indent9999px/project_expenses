import React from 'react';

function CurrencyDisplay({ amount }) {
    // amount를 로케일 설정에 따라 형식화된 문자열로 변환
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <>{formattedAmount}</>
    );
}

export default CurrencyDisplay;
