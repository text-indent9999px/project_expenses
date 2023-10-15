import React, { useState, useRef, useEffect } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

function App() {

	const [expenses, setExpenses] = useState([
		{
			"id": "1697305566024",
			"title": "테스트1번-식료품",
			"amount": "11",
			"date": "2020-10-13"
		},
		{
			"id": "1697305581816",
			"title": "테스트2-미용실",
			"amount": "58",
			"date": "2020-11-13"
		},
		{
			"id": "1697305572054",
			"title": "테스트3-간식",
			"amount": "45",
			"date": "2020-12-13"
		}
	]);

	const addExpenseHandler = (expenseData) => {
		// 입력된 데이터를 expenses 배열에 추가

		console.log(expenseData.title, expenseData.amount, expenseData.date);

		if (expenseData.title.trim() !== '' && expenseData.amount > 0 && expenseData.date.trim() !== '') {
			setExpenses((prevExpenses) => {
				const uniqueId = Date.now().toString(); // 고유한 id 생성
				const newExpense = { id: uniqueId, ...expenseData };
				return [...prevExpenses, newExpense];
			});
		}else{
			alert('입력 항목을 확인해 주세요.');
			return false;
		}
	};

	/*useEffect(() => {
		console.log(expenses);
	}, [expenses]);*/

  return (
    <div>
		<NewExpense onAddExpense={addExpenseHandler}/>
		<Expenses items={expenses}/>
    </div>
  );
}

export default App;
