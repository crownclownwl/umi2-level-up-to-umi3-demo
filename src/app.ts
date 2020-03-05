/**
 * @file 应用加载前准备文件
 * @description 向下兼容老版本无 token 的问题
 * @author 楚洋洋
 * @time 2019年10月31日 19点01分
 * @lastEditTime 2020年3月4日 10点08分
 * @lastEditors 王磊（磊皇）
 */

// 引入发送请求依赖
import { setAxios, Axios } from "@/utils/request";
// 引入工具类
import wlutils from 'idsutil';
import {actType} from "@/viewModels/common.config";

/**
 * @author 王磊（磊皇）
 * @time 2020-01-15 15:33:33
 * @lastEditTime 2020-01-15 15:33:27
 * @lastEditors 王磊（磊皇）
 * @description 为了防止页面报错，所以在这里定义全局变量的类型约定，如 window等
 * @global
 */
declare global {
    interface Window{
        userId:string;
        serverUrl:string;
        schoolId:string;
        systemName:string;
        userName:string;
        userType:string;
        actType: number;   // 审批流程专用的，业务类型，默认是 @/viewModels/common.config 里的 actType
        url:string;
        H5_Dev:string;
        token:string;
        // 学校系统相关配置，有预览文件需求的应用需要这么设置
        // windos.schoolSystemsConf = schoolInfo.systems;
        schoolSystemsConf:any;  
        niceName:string;
        /**
         * @author 王磊
         * @description 原生的PGMultiView
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊
         * @override Window
         * @exports Window
         */
        PGMultiView: {
          /**
           * @property
           * @method
           * @author 王磊
           * @description 用来跳转应用的
           * @time 2020年01月03日 11:33:46
           * @lastEditTime 2020年01月03日 11:33:46
           * @lastEditors 王磊
           * @type {Function}
           */
          loadView: Function;
       }
        VideoPlayerVLC:{ // 原生方法
            play:Function;
        };
        IdealSchool:{ // 原生方法
            selectContacts: Function;
            setToolbarRightMenus: Function;
            setToolbarTitle: Function;
            getUserInfo: Function;
            personalInfo:Function;
            logOut: Function;
            saveSystemToken:Function;
        };

    }
}

/**
 * @author 王磊（磊皇）
 * @description 引入dva
 * @time 2020-01-15 15:33:33
 * @lastEditTime 2020-01-15 15:33:27
 * @lastEditors 王磊（磊皇）
 */
export const dva = {
  config: {
    onError(err) {
      console.error(err);
      err.preventDefault();
    },
  },
};

/**
 * @author 王磊（磊皇）
 * @description 把获取的System 对象信息设置到window中
 * @time 2020-01-15 15:33:33
 * @lastEditTime 2020-01-15 15:34:32
 * @lastEditors 王磊（磊皇）
 * @param {object} data System 对象
 */
function SetWindowUserParam(data){
    if(data){
        window.userId = data.user_id;               //  用户id
        window.serverUrl = data.host_wan;           // 资源地址
        window.systemName = data.name;              // 系统名称
    }
}

/**
 * @author 王磊（磊皇）
 * @description 获取用户信息
 * @time 2020-01-15 15:33:33
 * @lastEditTime 2020-01-15 15:34:32
 * @lastEditors 王磊（磊皇）
 * @param {object} data System 对象
 * @param {*} that 
 */
function getSystemUserInfo(data){
    if(!data || data.length === 0){
        console.error("获取用户失败了");
        return false;
    }
    
    for(let item of data){
        if(item.name.indexOf("Guanliruanjian") >= 0){
            SetWindowUserParam(item);
            break;
        }
        // if(item.name.indexOf("mobile") >= 0){
        //     this.SetWindowUserParam(item);
        //     break;
        // }
        // if(item.name.indexOf("Zhijiaomofang191") >= 0){
        //     this.SetWindowUserParam(item);
        //     break;
        // }
        // if(item.name.indexOf("Zhijiaomofang181") >= 0){
        //     this.SetWindowUserParam(item);
        //     break;
        // }
        // if(item.name.indexOf("jiaoxuexitong") >= 0){
        //     this.SetWindowUserParam(item);
        //     break;
        // }
    }

    return true;
}


/**
 * @author 王磊（磊皇）
 * @description 获取用户token
 * @time 2020-01-15 15:33:33
 * @lastEditTime 2020-01-15 15:34:32
 * @lastEditors 王磊（磊皇）
 * @param {object} data 系统对象
 * @return {string} token
 */
function getUserToken(data) {
    for (let item of data) {
      if (item.name.indexOf('Guanliruanjian') >= 0) {
        return item.token;
      }
      // if(item.name.indexOf("mobile") >= 0){
      //   return item.token;
      // }
      // if(item.name.indexOf("Zhijiaomofang191") >= 0){
      //   return item.token;
      // }
      // if(item.name.indexOf("Zhijiaomofang181") >= 0){
      //   return item.token;
      // }
      // if(item.name.indexOf("jiaoxuexitong") >= 0){
      //   return item.token;
      // }
  
    }
  
    return null;
}

/**
 * @auto 王磊（磊皇）
 * @description 覆盖 umijs 的render 渲染函数，追加前置配置
 * @param {Function | any} oldRender umijs 的render 渲染函数
 */
export function render(oldRender) {
  window.actType = actType; // 审批类型
  console.log( window.H5_Dev)
  
  // 自定义环境变量  window.H5_Dev==="dev":本地H5应用; production:启动cordova混合式联调
  if(window.H5_Dev==="dev"){

    // 先设置代理并实例化axios对象
    setAxios({
      apiPath:  "/platform/m",
    },() => {});

    let params = {
        'school_id': '07ffabcd7ce947c3sdfsdf8137fa3d094a',
        'login_name': 'biyf',
        'password': '123456'
    };
    
    // 如果接口不带token，则不用调取登录接口，请注释掉如下请求代码
    Axios().post('/Login/login', params).then(
      res =>{
        const newToken = wlutils.getObjProperty('data.data.token', res, '');
        localStorage.setItem('p_token',newToken);
        setAxios({
          apiPath:  "/platform/m",
         
        },() => {
          oldRender();
        })
      }
    );

    window.userName = "测试";
    window.userType = "1";
    window.userId = "0556bf27fd5e4605a802f7e5e3558108";
    window.systemName = "测试学院";
    window.schoolId = "5ce24e7c1d6f2729f428908c";

    // 原生方法
    window.IdealSchool = {
      selectContacts: function(){
        console.log();
      },
      setToolbarTitle: function(param){
        console.log("此处为设置标题:", ...param)
      },
      setToolbarRightMenus: function(param){
        console.log("此处为设置右侧标题:", param)
      },
      getUserInfo: function(param){
        console.log("此处为获取当前用户信息:", ...param)
      },
      personalInfo: function(param){
        console.log("此处为获取用户信息:", ...param)
      },
      logOut: function(param){
        console.log("此处为退出重新登陆:", ...param)
      },
      saveSystemToken: function(param){
        console.log("此处为存储token:", ...param)
      },
    };
    window.VideoPlayerVLC = {
      play: function(param){
        console.log("此处为播放视频路径:", ...param)
      },
    };

    
    // @ts-ignore
    if(isMobile === true){
      // @ts-ignore
      window.PGMultiView = PGMultiView;
    }

  }else{
    document.addEventListener('deviceready', () => {

      // @ts-ignore
      window.PGMultiView = PGMultiView;
      window.IdealSchool.getUserInfo((json) => {
        console.log(json);
        localStorage.clear();
        window.localStorage.clear();
        var userInfo = json.user;
        var schoolInfo = json.school;
        window.token = getUserToken(userInfo.systems); // 只有管理软件才有token
        console.log("app.js中的 window.token")
        console.log(window.token)
        setAxios({
          apiPath:  json.school.api_gateway + "/guanlixitong/api"
        },() => {
            oldRender();
          }
        )
        // 当管理软件不接入token时，从原生获取的token为""；如果接入token，则token存在且不为空
        if( window.token !== "") {
          let myToken = localStorage.getItem('p_token');
          // 需提前做一下判断，防止切换应用时重复存储原生已过期的token
          if (!myToken) {
            localStorage.setItem('p_token', getUserToken(userInfo.systems)); // 存储原生返回的token信息
            myToken = getUserToken(userInfo.systems);
          }
          Axios().get('/Login/refreshToken', {headers: {'p-token': myToken,}}).then(
            res => {
              if (res && res.data.status === 40101 || res.data.code === 40101) {
                // 退出重新登陆
                window.IdealSchool.logOut()
              } else {
                // const timeStamp=new Date().getTime();
                // localStorage.setItem('time_stamp', timeStamp);
                const newToken = wlutils.getObjProperty('data.data.token', res, '');
                localStorage.setItem('p_token', newToken);
                // 若是真机环境下，需向原生存储token，否则应用关闭或者切换应用后本地存储会清除
                if (window.H5_Dev !== "dev") {
                  window.IdealSchool.saveSystemToken(window.systemName, newToken);
                }
              }
            }
          );
        }
       
        window.schoolId = schoolInfo.id;
        window.userName = userInfo.username; // 用户名
        window.niceName = userInfo.name; // 姓名
        window.userType = userInfo.type; // 用户类型
        
        getSystemUserInfo(userInfo.systems);
       
        // 特殊处理文件上传前缀bug
        window.serverUrl =wlutils.isEmpty(window.serverUrl) ? wlutils.getObjProperty('server_url_lan', schoolInfo):window.serverUrl;
      });
      
      

    }, false);
  }

}
