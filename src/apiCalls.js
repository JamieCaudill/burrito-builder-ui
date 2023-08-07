export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching orders");
    }
    return response.json();
  })
};

export const postOrder = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orderss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error posting order");
    }
    return response.json()
  });
}