
import axios from "axios";

const deleteOrders = async () => {
  const orders = await axios.get('http://localhost:5000/api/orders');
  const ids = orders.data.data.map(order => {
    return axios.delete(`http://localhost:5000/api/orders/${order.id}`)
  })
  const promiseAll = await Promise.all(ids)
  console.log(promiseAll)
}
deleteOrders()
