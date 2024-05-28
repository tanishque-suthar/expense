import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteExpense = () => {
    const navigate = useNavigate();

    const handleOnChange = (e) => {
      const { name, value } = e.target;
    };
  
    const handleError = (err) =>
      console.log("error");
    const handleSuccess = (msg) =>
      console.log("success");
  
    const expenseId = "";

    const deleteExpense = (id) => axios.delete(`/expenses/${id}`);
    const handleSubmit = async (id) => {
      id.preventDefault();
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/delete-expense/:${id}`,
          { withCredentials: true }
        );
        console.log(data);
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="form_container">
      <h2>Delete Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expenseid">Expense ID</label>
          <input
            type="expenseid"
            name="expenseid"
            value={expenseId}
            placeholder="Enter expense ID to delete"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Reutrn to dashboard? <Link to={"/dashboard"}>Dashboard</Link>
        </span>
        </form>
    </div>
  );
};

export default DeleteExpense;