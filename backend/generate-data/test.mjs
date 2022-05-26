import axios from 'axios';

const addTagToOrders = async () => {
  const ordersList = await axios.get('http://localhost:5000/api/orders');
  console.log(ordersList)
}

addTagToOrders();
