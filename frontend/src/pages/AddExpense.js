import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const AddExpense = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    paymentMethod: "",
  });
  const { title, amount, date, category, paymentMethod } = expense;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleError = (err) =>
    console.log("error");
  const handleSuccess = (msg) =>
    console.log("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/add-expense",
        {
          ...expense,
        },
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
    setExpense({
      ...expense,
      title: "",
      amount: "",
      date: "",
      category: "",
      paymentMethod: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Expense Title</label>
          <input
            type="title"
            name="title"
            value={title}
            placeholder="Enter title for your expense"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="amount"
            name="amount"
            value={amount}
            placeholder="Enter amount"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            placeholder="Enter date"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="category"
            name="category"
            value={category}
            placeholder="Category(entertainment, essentials, food)"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="Payment Method">Category</label>
          <input
            type="Payment Method"
            name="Payment Method"
            value={paymentMethod}
            placeholder="Payment Method (UPI, cash, card)"
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

export default AddExpense;