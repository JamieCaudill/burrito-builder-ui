import { useEffect } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  useEffect(() => {
    getOrders().catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      {/* <Orders orders={"Here is where orders go"} /> */}
    </main>
  );
}

export default App;
