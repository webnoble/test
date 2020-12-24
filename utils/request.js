import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { addParamToUrl } from './index';
import i18n from '@/lang'
import { getBaseUrl } from '@/utils'

const baseUrl = process.env.VUE_APP_BASE_API || getBaseUrl();

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : baseUrl, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom statusCode
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // if the custom statusCode is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: response.statusText || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(new Error(response.statusText || 'Error'));
    } else {
      let res = response.data;
      if (typeof res === 'string') {
        res = JSON.stringify(res);
      }

      if (res.httpCode === 302) { // 302表示未登录
        store.dispatch('user/resetToken').then(() => {
          const frontUrl = addParamToUrl({ sso_type: 'front' });
          const redirectUrl = addParamToUrl({ backurl: frontUrl }, res.data.sso_redirect_url);
          console.log(redirectUrl)
          window.location.href = redirectUrl;
        });
        return false;
      }

      if (res.statusCode !== 0) {
        Message({
          showClose: true,
          message: res.statusText || 'Error',
          type: 'error',
          duration: 5 * 1000
        });

        return Promise.reject(new Error(res.statusText || 'Error'));
      }
      return res.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      showClose: true,
      message: i18n.t('request.networkErr'),
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
