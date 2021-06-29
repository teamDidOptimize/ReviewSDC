import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  let productId = Math.floor(Math.random() * 1000000 + 1);
  http.get(`http://localhost:3000/fetchReviews?productId=${productId}`);
}