import axios from 'axios';

const addTagToOrders = async () = {
  let orders = await axios.get('http://localhost:5000/api/orders');
  console.log(orders)
}

addTagToOrders();
