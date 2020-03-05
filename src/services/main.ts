/**
 * @file 后台数据接口
 * @author 王磊
 * @time 2019年8月19日 14点48分
 */
import { stringify } from 'qs';
import { Axios } from '@/utils/request';


// 获取申请列表数据
export async function getApproveList(params: any) {
    return Axios().get(`act/applyList?${stringify(params)}`);
}

// 获取待办事项列表数据
export async function getWaitList(params: any) {
    return Axios().get(`act/waitList?${stringify(params)}`);
}

// 获取已办事项列表数据
export async function getAlreadyList(params: any) {
    return Axios().get(`act/alreadyList?${stringify(params)}`);
}

// 获取待阅列表数据
export async function getWaitReadList(params: any) {
    return Axios().get(`act/waitReadList?${stringify(params)}`);
}

// 获取申请列表查询数据
export async function getApproveListFilter(params: any) {
    return Axios().get(`approve/getListFilter?${stringify(params)}`);
}


// 获取创建申请页面的字段值
export async function getApproveCreateFileds(params: any) {
    return Axios().get(`act/applyForm?${stringify(params)}`);
}

// 保存创建申请数据
export async function saveApproveCreateData(params: any) {
    return Axios().post(`act/saveApplyFormData?actType=${window.actType}`, params);
}

// 保存审批数据
export async function saveAuditData(actType, params: any) {
    return Axios().post(`act/saveAuditData?actType=${actType}`, params);
}

// 图片和视频文件上传
export async function uploadFile(params: any) {
    return Axios().post( `jxoa/apply/vedio`,params,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
}

// 获取数据详情
export async function workDetail(params: any) {
    return Axios().get(`/act/viewFormData?${stringify(params)}`);
}

// 获取工作流表单详情
export async function stepList(params: any) {
    return Axios().get(`/act/stepList?${stringify(params)}`);
}

// 撤回申请
export async function backApply(params: any) {
    console.log(params)
    return Axios().post(`/act/backApply?jxoaListId=${params.jxoaListId}`);
}

// 获取审批意见的当前步骤节点
export async function getCurrentAuditStep(params: any) {
    
    return Axios().get(`/act/getAuditPage?${stringify(params)}`);
}