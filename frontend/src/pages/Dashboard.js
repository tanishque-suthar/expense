import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
  
    const handleError = (err) =>
      console.log("error");
    const handleSuccess = (msg) =>
      console.log("success");

    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async()=>{
        const { data } = await axios.get("http://localhost:5000/get-expenses");
        console.log(data);
        setExpenses(data);
    }
  
    useEffect(() => {
      fetchExpenses();
    }, [])

  return (
    <div className="form_container">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <div className="expenseList">
                {expense.title}: ${expense.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;