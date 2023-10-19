import React, { useState, useRef, useEffect } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

function App() {

	const [expenses, setExpenses] = useState([
		{
			"id": "1697305566024",
			"title": "테스트1번-월급",
			"amount": "3000000",
			"date": "2020-10-13",
			"amountType" : "plus",
			"category" : "근로수입"
		},
		{
			"id": "1697305581816",
			"title": "테스트2-미용실",
			"amount": "30000",
			"date": "2020-11-13",
			"amountType" : "minus",
			"category" : "기타지출"
		},
		{
			"id": "1697305572054",
			"title": "테스트3-간식",
			"amount": "5000",
			"date": "2020-12-13",
			"amountType" : "minus",
			"category" : "기타지출"
		}
	]);

	const [selectedData, setSelectedData] = useState([]);

	const addExpenseHandler = (expenseData) => {
		// 입력된 데이터를 expenses 배열에 추가
		//console.log(expenseData.title, expenseData.amount, expenseData.date);
		//if (expenseData.title.trim() !== '' && expenseData.amount > 0 && expenseData.date.trim() !== '') {
			setExpenses((prevExpenses) => {
				const uniqueId = Date.now().toString(); // 고유한 id 생성
				const newExpense = { id: uniqueId, ...expenseData };
				return [...prevExpenses, newExpense];
			});
		//}else{
			//alert('입력 항목을 확인해 주세요.');
		//}
		setSelectedData([]);
	};

	const deleteExpenseHandler = (expenseData) => {
		let id = expenseData.id;
		setExpenses((prevExpenses) => {
			const newExpense = prevExpenses.filter(function(e){
				if(e.id !== id){
					return true;
				}
			})
			return newExpense;
		});
		setSelectedData([]);
	}

	const modifyExpenseHandler = (expenseData) => {
		setSelectedData([expenseData]);
	}

	const modifyExpenseHandler2 = (expenseData) => {
		let id = expenseData.id;
		setExpenses((prevExpenses) => {
			const newExpense = prevExpenses.reduce(function(acc, cur, idx){
				if(cur.id === id){
					acc.push(expenseData);
				}else{
					acc.push(cur);
				}
				return acc; // 누적 배열 반환
			},[])
			return newExpense;
		});
		setSelectedData([]);
	}

	const cancelButtonClick = () => {
		setSelectedData([]);
	}


	/*useEffect(() => {
		console.log(expenses);
	}, [expenses]);*/

  return (
    <div>
		<NewExpense onAddExpense={addExpenseHandler} items={selectedData} onCancelButtonClick={cancelButtonClick} onModifyExpense={modifyExpenseHandler2}/>
		<Expenses items={expenses} onDeleteExpense={deleteExpenseHandler} onModifyExpense={modifyExpenseHandler} />
    </div>
  );
}

export default App;
