import axios from 'axios';
import { faker } from '@faker-js/faker';

const requests = [...Array(30)].map(() => {
  const body = {
    name: faker.system.commonFileType(),
    color: faker.internet.color(),
  };
  return axios.post('http://localhost:5000/api/tags', body);
});

const creatingTags = async (arrPromises) => {
  const response = await Promise.all(arrPromises);
  console.log(response);
};

creatingTags(requests);
