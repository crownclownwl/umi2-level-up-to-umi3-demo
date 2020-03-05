/**
 * @file: 配置
 * @description: 向下兼容老版本无 token 的问题
 * @author: 楚洋洋
 * @time: 2019年10月31日 19点01分
 * @lastEditTime: 2019年12月18日 16:17:46
 * @lastEditors: 王磊
 */
import axios from "axios";
import _ from "lodash";
import { Toast } from 'antd-mobile';
import {history} from 'umi';
import wlutils from 'idsutil';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

let axios_instance
let config = {
  timeout: 10000,
}
// 存储所有失效请求信息
let Arr = [];
// Promise函数集合
let subscribers = [];
// 刷新请求token
let isRefreshing = true;
// 重发全部请求
function onAccessTokenFetched() {
  subscribers.forEach((callback)=>{
    callback();
  });
  subscribers = [];
}

/**
 * 初始化实例
 * @param {object} params 配置参数
 * @param {Function} callback 回调函数
 */
export  function setAxios( params, callback) {
  const token = localStorage.getItem('p_token');
  config =  _.extend( {}, config, params );
  console.log("--01---window.token--------");
  console.log(window.token);
  
  initInterceptors(callback);
}
/**
 * 初始化拦截器
 * @param {Function} callback 回调函数
 */
async function initInterceptors(callback){
    axios_instance = axios.create(
        {
          baseURL: config.apiPath,
          headers: window.H5_Dev==="dev" ?
                  wlutils.isNotEmpty(window.token) ? wlutils.isNotEmpty(token)?{'p-token':token, }:"" : {}
              : wlutils.isNotEmpty(window.token)　? {'p-token':token, } : {},
        } 
    );
  
    axios_instance.interceptors.response.use(function (response) {
      console.log("--02---window.token--------");
      console.log(window.token);
      // 执行回调函数
      if(typeof callback === 'function'){
          callback();
      }
      if( wlutils.isNotEmpty(window.token)){
        const _config = response.config;
  
        const bizStatus = wlutils.getObjProperty('data.status', response, '');        // 后台业务返回的状态码
        const bizCode = wlutils.getObjProperty('data.code', response, '');          // 后台业务返回的状态代码
  
        // 拦截所有失效请求并重新获取token
        if(response && (bizStatus === 40103 || bizCode === 40103)){
          let retryOriginalRequest = null;
          let testToken = localStorage.getItem('p_token');
          Arr.push(_config);
          // 设置isRefreshing，防止重复请求
          if(isRefreshing){
            axios.request({
              baseURL: config.apiPath,
              url:'Login/refreshToken',
              method: 'get',
              headers:testToken!==null?{'p-token':testToken, }:"",
            }).then((res)=>{
              if(res && (wlutils.getObjProperty('data.status', res, '') === 40101 
                          || wlutils.getObjProperty('data.code', res, '') === 40101)){
                // 退出重新登陆
                window.IdealSchool.logOut();
              }else{
                let newToken = wlutils.getObjProperty('data.data.token', res, '');
                localStorage.setItem('p_token', newToken);
                // 若是真机环境下，需向原生存储token，否则应用关闭或者切换应用后本地存储会清除
                if(window.H5_Dev!=="dev"){
                  console.log("undev");
                  window.IdealSchool.saveSystemToken(window.systemName, newToken);
                }
                // 利用空白页面进行重定向
                let routePath = location.hash;
                history.push({
                  pathname: '/notice/blankPage',
                  query: {
                    a: routePath,
                  },
                });
                isRefreshing = true;
                // 重新发送后清空失效请求
                Arr=[];
              }
  
              
            });
          }
          isRefreshing = false;
          
          return retryOriginalRequest;
        } else if(response && (bizStatus === 40103 || bizCode === 40103)){
          // 退出重新登陆
          window.IdealSchool.logOut();
        }else {
          return response;
        }
      }else{
        return response;
      }
    }, function (error) {
      let res = error.response;
      try {
        if(res.status === 401) {
        }
        else {
          Toast.hide();
          setTimeout(() => {
              // res.data && res.data.includes("错误信息：")
              //     ? Toast.fail(`接口错误，请及时联系开发人员`) 
              //     : Toast.fail(`请求错误\n${res.data}`)
              res.data && res.data.includes("错误信息：")
                ? console.error(`接口错误，请及时联系开发人员`) 
                : console.error(`请求错误\n${res.data}`);
          }, 500);
          
        }
      } catch (e) {
          Toast.hide();
          setTimeout(() => {
              // wlutils.getObjProperty('data', res) && wlutils.getObjProperty('data', res,'').includes("错误信息：")
              //     ? Toast.fail(`接口异常，请及时联系开发人员`) 
              //     : Toast.fail(`请求异常\n${wlutils.getObjProperty('data', res)}`)
              wlutils.getObjProperty('data', res) && wlutils.getObjProperty('data', res,'').includes("错误信息：")
                  ? console.error(`接口异常，请及时联系开发人员`) 
                  : console.error(`请求异常\n${wlutils.getObjProperty('data', res)}`)
          }, 500);
      }
      // 临时定义错误返回空数组，
      const data = {data:[]};
      let tempResponse = data;
      return tempResponse;
    });
}

export function Axios(params) {
  console.log("--03---window.token--------");
  console.log(window.token);
  // 重新设置除去重新请求之外的新的请求头，更换为refresh之后的新token
  if(window.token !== "" && localStorage.getItem('p_token') ){
    // 判断是否需要添加token，如果不需要添加，直接在services接口里面传个参数"no_token"
    if(params !== "no_token"){
      axios_instance.defaults.headers["p-token"] = localStorage.getItem('p_token');
    }else{
      axios_instance.defaults.headers = {};
    }
  }
  return axios_instance;
}
