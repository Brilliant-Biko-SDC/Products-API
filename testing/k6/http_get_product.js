import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 1, duration: '60s' },
    { target: 10, duration: '60s' },
    { target: 100, duration: '60s' },
    { target: 1000, duration: '60s' },
  ],
  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['avg < 50', 'p(95) < 20']
  },
};

export default function () {
  const max = 1000011;

  const product_id = Math.floor(Math.random() * max) || 1;

  const res = http.get(`http://localhost:3001/api/products/${product_id}`);

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200
  });
}
