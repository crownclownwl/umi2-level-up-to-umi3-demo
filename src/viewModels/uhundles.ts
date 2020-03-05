/**
 * @description 同意处理函数，需要变动或自定义的处理函数，如提交表单的处理
 * @author 王磊（磊皇）
 * @time 2020年2月26日 10点59分
 * @lastEditTime 2020年3月4日 10点15分
 * @lastEditors 王磊（磊皇）
 */

 /**
  * @description 需要变动或自定义的处理函数，如提交表达的处理
  * @author 王磊（磊皇）
  * @time 2020年2月26日 10点59分
  * @lastEditTime 2020年2月26日 10点59分
  * @lastEditors 王磊（磊皇）
  * @param data 
  * @param item 
  * @param {object} that 页面的实例
  * @exports changePicker
  */

import wlutils from 'idsutil';
import { Toast } from 'antd-mobile';
import IResponseParam from '@/entity/IDispatchParam';
import {history} from 'umi';

let changePicker = (data, item, that) => {
    if(data[0]==='2'){
        window.actType = 2
        // window.actType === 2 ?'':window.actType = 2
    }else{
        window.actType = 3
        // window.actType === 2 ?window.actType = 3:''
    }
    that.init();
}

/**
 * @author 王磊（磊皇）
 * @description 提交申请方法
 * @time 2020年2月26日 11点10分
 * @lastEditTime 2020年2月26日 11点10分
 * @lastEditors 王磊（磊皇）
 * @param {string} dispatchType  model 的请求方法
 * @param {any} that         页面实例引用
 * @exports hundleSubmit
 */
let hundleSubmit = (dispatchType:string, that:any)=>{
    //获取编辑页表单：
    const fromInstance = that.child.getFromInstance();
    fromInstance.validateFields({first:true}, (error: any, value: any) => {

        // 如果有错误，就提示错误信息
        if(wlutils.isNotEmpty(error) && Object.keys(error).length > 0){
            Toast.fail(wlutils.getObjProperty(`${Object.keys(error)[0]}.errors.0.message`, error));
            return false;
        }

        console.log(value);
        const { dispatch } = that.props;

        // 如果有文件的话，需要特殊处理，只要文件文件路径
        if(wlutils.getObjProperty("uploadFile",value)){
            let uploadFiles = "";
            for(let fitem of value.uploadFile){

                if(fitem.type === 0){ //图片
                    uploadFiles += fitem.url_path;
                }else if(fitem.type === 1){ // 视频，需要封面图片
                    uploadFiles += fitem.url_path;
                    uploadFiles += ",";
                    uploadFiles += fitem.url_path.substr(0, fitem.url_path.lastIndexOf(".mp4")) + ".jpg"; // 封面图片
                } 
                uploadFiles += ",";
            }

            // 替换掉最后一个都好
            value.uploadFile = uploadFiles.substr(0, uploadFiles.lastIndexOf(','));
        }

        // 如果存在部门的话
        if(wlutils.getObjProperty("leaderDept",value)){
            // 替换一下后台要的格式
            value.leaderDept = value.leaderDept[0];
        }

        // 如果存在发生人的话
        // if(wlutils.getObjProperty("selUser",value)){
        //     value.selUser = wlutils.getObjProperty('selUser.id', value, '');
        // }
        

        dispatch({
            type:`${dispatchType}`,
            payload:{
                requestData:value
            },
            callback: (res: IResponseParam) => {
                if(wlutils.isNotEmpty(res)){
                    
                    if(res.status === true){
                        // 把列表页面的状态保存到全局的model中，方便从详情页返回的时候获取之前的状态
                        that.props.dispatch({
                            type:'global/save',
                            payload:{
                                listViewData: {
                                    isFromDetail: false, // 让他重新请求列表数据
                                }
                            }
                          });
                        // 提示成功
                        Toast.success("提交成功", 3, ()=> {
                            // 跳转到申请列表页面
                            history.replace({
                                pathname: '/application/list',
                            });
                        });
                    }else if(res.status === false){
                        Toast.fail(res.msg);
                    }
                }
            }
        });

        return true;
    })
}

export {
    changePicker,
    hundleSubmit
}