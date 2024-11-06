import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

// helper imports
import { fetchData, getAllMatchingItems } from "../helpers";

// loader
export async function budgetOptimizationLoader() {
  const expenses = fetchData("expenses");
  const budgets = await getAllMatchingItems({ category: "budgets" });
  return { expenses, budgets };
}

const BudgetOptimizationPage = () => {
  const { expenses, budgets } = useLoaderData();
  const [cutAmount, setCutAmount] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [totalCutFromBudgets, setTotalCutFromBudgets] = useState(0);
  const [totalCutFromExpenses, setTotalCutFromExpenses] = useState(0);

  // Calculate total current budget
  const totalCurrentBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedCutAmount = Number(cutAmount);
    const parsedTimeFrame = Number(timeFrame);

    // Desired end budget is the total current budget minus the cut amount
    const desiredEndBudget = totalCurrentBudget - parsedCutAmount;

    // Check if the desired end budget is valid
    if (desiredEndBudget < 0) {
      toast.error("Desired end budget cannot be negative!");
      return;
    }

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const monthlyReduction = parsedCutAmount / parsedTimeFrame;
    const newPredictions = [];
    const newSuggestions = [];
    let remainingCut = parsedCutAmount;

    // Calculate predictions
    for (let month = 1; month <= parsedTimeFrame; month++) {
      newPredictions.push(totalExpenses - (monthlyReduction * month));
    }

    // Generate suggestions and track total cuts
    let budgetCuts = 0; // To track total cuts from budgets
    let expenseCuts = 0; // To track total cuts from expenses
    const sortedExpenses = [...expenses].sort((a, b) => a.amount - b.amount); // Sort expenses by amount

    for (const expense of sortedExpenses) {
      if (remainingCut <= 0) break; // Stop if we've cut enough

      // Determine how much to cut from this expense
      const maxCutFromExpense = expense.amount / 2; // Split the cost so we don't eliminate completely
      const cutFromExpense = Math.min(maxCutFromExpense, remainingCut);
      if (cutFromExpense > 0) {
        newSuggestions.push(`Reduce ${expense.name} by $${cutFromExpense.toFixed(2)}`);
        remainingCut -= cutFromExpense;
        expenseCuts += cutFromExpense; // Track total cuts from expenses
      }
    }

    // Now also suggest cutting from budget accounts (if any)
    for (const budget of budgets) {
      if (remainingCut <= 0) break; // Stop if we've cut enough

      const cutFromBudget = Math.min(budget.amount / 2, remainingCut); // Suggest cutting half from each budget
      if (cutFromBudget > 0) {
        newSuggestions.push(`Reduce ${budget.name} budget by $${cutFromBudget.toFixed(2)}`);
        budgetCuts += cutFromBudget;
        remainingCut -= cutFromBudget;
      }
    }

    // Set predictions, suggestions, and total cuts
    setPredictions(newPredictions);
    setSuggestions(newSuggestions);
    setTotalCutFromBudgets(budgetCuts);
    setTotalCutFromExpenses(expenseCuts); // Update state for total cuts from expenses
    toast.success("Predictions and suggestions calculated!");
  };

  return (
    <div className="grid-lg">
      <h1>Budget Optimization</h1>
      <form className="grid-sm" onSubmit={handleSubmit}>
        <div className="grid-xs">
          <label htmlFor="cutAmount">Amount to Cut Down</label>
          <input
            type="number"
            id="cutAmount"
            value={cutAmount}
            onChange={(e) => setCutAmount(e.target.value)} // Keep as string to allow empty
            placeholder=""
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="timeFrame">Time Frame (months)</label>
          <input
            type="number"
            id="timeFrame"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)} // Keep as string to allow empty
            placeholder=""
            required
          />
        </div>
        <button type="submit" className="btn btn--dark">
          Calculate Predictions
        </button>
      </form>

      {/* Displaying the Predictions as a List */}
      {predictions.length > 0 && (
        <div className="predictions">
          <h2>Predicted Expenses Over Time</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>Month {index + 1}: {prediction.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Displaying Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          <h2 style={{ marginBottom: '8px' }}>Suggestions for Cuts</h2>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
          <h2 style={{ marginTop: '40px' }}>Total cuts</h2>
          <h3 style={{ marginTop: '8px' }}>Total Amount Reduced from Expenses: ${totalCutFromExpenses.toFixed(2)}</h3>
          <h3 style={{ marginTop: '8px' }}>Total Amount Reduced from Budgets: ${totalCutFromBudgets.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default BudgetOptimizationPage;
