import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 0,
      maxVUs: 500,
    },
  },
};

export default function () {
  let productId = Math.floor(Math.random() * 1000000 + 1);
  http.get(`http://localhost:3000/fetchReviews?productId=${productId}`);
}