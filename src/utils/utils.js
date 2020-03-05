import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
import _ from 'lodash';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

/**
 *  获取 UUID
 *
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 */
export function generateUUID(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}


/**
 * 处理表单错误
 * @param {object} error 错误信息
 * @exports handleError
 * @function
 */
export function handleError(error) {
    let messages = [];
    Object.keys(error).forEach(key => {
        if (error[key].errors.length > 0) {
            messages.push(error[key].errors[0].message);
        }
    });
    return messages[0];
    // return messages.join('<br />');
}

/**
 * 把对象属性排序
 * @param {object} obj 要排序的对象 
 * @function
 * @exports objKeySort
 */
export function objKeySort(obj) {
    var newObj = {};
    Object.keys(obj).sort().forEach(key => {
        newObj[key] = obj[key];
    });
    return newObj;
}

/**
 * 设置localStorage
 * @param {string} key 键
 * @param {string} value 值 
 * @function
 * @exports setLocalStorage
 */
export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}


/**
 * 取出localStorage
 * @param {string} key 键 
 * @function
 * @exports getLocalStorage
 */
export function getLocalStorage(key) {
    localStorage.getItem(key);
}


/**
 * 格式化日期
 * @param {string} dt 日期
 * @function
 * @exports formatDate
 * @return {string} 格式化后的字符串
 */
export function formatDate(dt) {
    let now = new Date();
    let date = new Date(dt.replace(/-/g, '/'));
    let s = parseInt(now - date) / 1000;
    let today = Date.parse(new Date(now.getYear(), now.getMonth(), now.getDate(), 23, 59, 59));
    if (s < 0){
        return dateformat(date, 'mm-dd HH:MM');
    }else if (s <= 60 && s >= 0) {
        return '刚刚';
    } else if (s > 60 && s <= 300) {
        return parseInt(s / 60) + '分钟前';
    } else if (s > 300 && Date.parse(date) < today) {
        return dateformat(date, 'HH:MM');
    } else {
        return dateformat(date, 'mm-dd HH:MM');
    }
}

/**
 * 格式化日期带年份
 * @param {string} dt 日期
 * @function
 * @exports formatDateLong
 * @return {string} 格式化后的字符串
 */
export function formatDateLong(dt) {
    let now = new Date();
    let date = new Date(dt.replace(/-/g, '/'));
    let s = parseInt(now - date) / 1000;
    let today = Date.parse(new Date(now.getYear(), now.getMonth(), now.getDate(), 23, 59, 59));
    if (s <= 60) {
        return '刚刚';
    } else if (s > 60 && s <= 300) {
        return parseInt(s / 60) + '分钟前';
    } else if (s > 300 && Date.parse(date) < today) {
        return dateformat(date, 'HH:MM');
    } else {
        return dateformat(date, 'yyyy-mm-dd HH:MM');
    }
}

/**
 * 增加分钟
 * @param {datetime} dt 时间
 * @param {int} minute 添加的分钟
 * @function
 * @exports datetimeAddMinutes
 * @return {Date} 增加后的时间对象
 */
export function datetimeAddMinutes(dt, minute) {
    var result = new Date(dt);
    result.setMinutes(result.getMinutes() + minute);
    return result;
}

/**
 * 增加天数
 * @param {datetime} dt 时间
 * @param {int} day 添加的天数
 * @function
 * @exports datetimeAddDay
 * @return {Date} 增加后的时间对象
 */
export function datetimeAddDay(dt, day) {
    var result = new Date(dt);
    result.setDate(result.getDate() + day);
    return result;
}

/**
 * 数组中的数字是否都连续
 * @function
 * @param {*} arr 数组
 * @exports isContinuationInteger
 * @return {boolean} 是否连续，true 是，false 不是
 */
export function isContinuationInteger(arr){
    if(!_.isArray(arr)){
        return false;
    }
    if(arr.length <= 1){
        return true;
    }
    for(var i = 0;i < arr.length -1;i++){
        if(arr[i+1] - arr[i] !== 1){
            return false;
        }
    }
    return true;
}

/**
 * 计算地图间两个经纬度的距离
 * @param {number} lat1 经纬度
 * @param {number} lng1 经纬度
 * @param {number} lat2 经纬度
 * @param {number} lng2 经纬度
 * @function
 * @exports getFlatternDistance
 * @return {number} 距离
 * 
 */
export function getFlatternDistance(lat1,lng1,lat2,lng2){

    var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    
    function getRad(d){
        return d*PI/180.0;
    }

    var f = getRad((lat1 + lat2)/2);
    var g = getRad((lat1 - lat2)/2);
    var l = getRad((lng1 - lng2)/2);
    
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    
    var s,c,w,r,d,h1,h2;
    var a = EARTH_RADIUS;
    var fl = 1/298.257;
    
    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;
    
    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;
    
    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;
    
    return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
}
/**
 * 判断是否在手机app里
 * @function
 * @exports inMobile
 * @return {boolean} 是否在手机app里，true 是，false 不是
 */
export function inMobile(){
    return navigator.userAgent.includes('Mobile');
}

/**
 * 新开启webview
 * @function
 * @exports loadMutilview
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @param {Function} success 成功回调
 * @param {Function} error 失败回调
 */
export function  loadMutilview(url,data,success,error){
    PGMultiView.loadView(url, JSON.stringify(data || {}), success, error);
}