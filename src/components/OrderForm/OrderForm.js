import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm({orders, setOrders}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if(!name || !ingredients.length) {
      return alert("Please enter a name and at least one ingredient");
    } 
    const newOrder = {
      id: orders.length + 1,
      name: name,
      ingredients: ingredients,
    };
    postOrder(newOrder).then(data => setOrders((orders) => [...orders, data]))
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient, index) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => {
          e.preventDefault();
          (setIngredients([...ingredients, ingredient]))
        }}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        className="name-input"
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
