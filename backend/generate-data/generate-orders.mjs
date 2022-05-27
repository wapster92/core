import axios from 'axios';
import { faker } from '@faker-js/faker';

const creatingOrders = async () => {
  const tags = await axios.get('http://localhost:5000/api/tags')
  const tagsLength = tags.data.data.length;
  console.log(tags.data.data)
  const bodys = [...Array(10)].map(() => ({
    name: faker.name.findName(),
    deadline: faker.date.between('2022-01-01T00:00:00.000Z', '2030-01-01T23:59:59.000Z'),
    company: faker.company.companyName(),
    amount: faker.finance.amount(1000, 200000),
    completed: faker.datatype.boolean(),
    tag: tags.data.data[Math.ceil(Math.random()*tagsLength)],
  }))
  const requests = bodys.map((el) => {
    return axios.post('http://localhost:5000/api/orders', el)
  })
  const response = await Promise.all(requests);
  console.log(response)
};

creatingOrders();
