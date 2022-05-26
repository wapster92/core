import axios from 'axios';
import { faker } from '@faker-js/faker';

const requests = [...Array(10000)].map(() => {
  const body = {
    name: faker.name.findName(),
    deadline: faker.date.between('2022-01-01T00:00:00.000Z', '2030-01-01T23:59:59.000Z'),
    company: faker.company.companyName(),
    amount: faker.finance.amount(1000, 200000),
    completed: faker.datatype.boolean(),
  }
  return axios.post('http://localhost:5000/api/orders', body)
})

const creatingOrders = async (arrPromises) => {
  const response = await Promise.all(arrPromises);
  console.log(response)
}

creatingOrders(requests)
