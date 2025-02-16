import { useState } from "react";
import { postOrder } from "../../apiCalls";
import Error from "../Error/Error";

function OrderForm({orders, setOrders, setError}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [formError, setFormError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if(!name || !ingredients.length) {
      setFormError(true);
      return;
    } 
    const newOrder = {
      id: orders.length + 1,
      name: name,
      ingredients: ingredients,
    };
    postOrder(newOrder)
      .then(data => setOrders((orders) => [...orders, data]))
      .catch(err => setError(err.message));
    clearInputs();
  }

  function handleClick(ingredient) {
    setFormError(false)
    if (ingredients.includes(ingredient)) {
      return;
    }
    setIngredients([...ingredients, ingredient])
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
        className='ingredient-btn'
        key={ingredient}
        name={ingredient}
        onClick={(e) => {
          e.preventDefault();
          handleClick(ingredient)
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

      {formError && <Error />}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button className='submit-btn' onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
