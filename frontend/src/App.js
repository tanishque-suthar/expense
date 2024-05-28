import { Route, Routes } from "react-router-dom";
import { AddExpense, Dashboard, DeleteExpense, Home, Login, Signup } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delete-expense" element={<DeleteExpense />} />
      </Routes>
    </div>
  );
}

export default App;