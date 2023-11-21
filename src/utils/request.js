import axios from 'axios';

const request = (config) => {
  return new Promise((resolve, reject) => {
    const service = axios.create({
      baseURL: '/api',
      timeout: 60000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
      },
    });

    service(config).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      };
    }).catch(err => {
      reject(err);
    })
  })
};

export default request;
