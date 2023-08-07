import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";
import Error from "../../components/Error/Error";

function App() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data.orders))
      .catch((err) => setError("Error fetching data:", err));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        {error && <p>{error}</p>}
        <OrderForm setOrders={setOrders} orders={orders} setError={setError}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
