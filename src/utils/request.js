import axios from 'axios';
import { Message } from 'element-ui';

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
      } else {
        Message.error('出错了！请稍后再试！');
      };
    }).catch(err => {
      reject(err);
      Message.error('出错了！请稍后再试！');
    })
  })
};

export default request;
