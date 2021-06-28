import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { duration: '20s', target: 300 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['avg < 50', 'p(90) < 20']
  },
};

export default function () {
  const max = 1000011;

  const product_id = Math.floor(Math.random() * max) || 1;

  const res = http.get(`http://localhost:3001/api/products/${product_id}/related`);

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200
  });
}
