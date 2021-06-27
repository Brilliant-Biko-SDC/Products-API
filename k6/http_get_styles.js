import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  stages: [
    { target: 1, duration: '60s' },
    { target: 10, duration: '60s' },
    { target: 100, duration: '60s' },
    { target: 1000, duration: '60s' },
  ],
  thresholds: {
    requests: ['count < 100'],
  },
};

export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const max = 1000011;

  const product_id = Math.floor(Math.random() * max) || 1;

  const res = http.get(`http://localhost:3001/api/products/${product_id}/styles`);

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
  });
}
