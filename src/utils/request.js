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
      const { status, data: { code } } = res;
      if (status === 200 && code === 200) {
        resolve(res.data);
      } else {
        console.log('zhixing1')
        Message.error(err.msg);
        reject(res.data);
      };
    }).catch(err => {
      console.log('zhixing2')
      reject(err);
      Message.error('出错了！请稍后再试！');
    })
  })

  // const service = axios.create({
  //   baseURL: '/api',
  //   timeout: 60000,
  //   headers: {
  //     'X-Requested-With': 'XMLHttpRequest',
  //     'Access-Control-Allow-Origin': '*'
  //   },
  // });
  // // 添加响应拦截器
  // service.interceptors.response.use(response => {
  //   // 对响应数据做点什么
  //   console.log('response', response);
  //   const { status, data: { code } } = response;
  //   if (status === 200 && code === 200) {
  //     return Promise.resolve(response.data);
  //   } else {
  //     console.log('zhixing')
  //     Message.error('出错了！请稍后再试！');
  //     return Promise.reject(response.data)
  //   };
  // }, error => {
  //   // 对响应错误做点什么
  //   return Promise.reject(error);
  // });

  // service(config);
};

export default request;
