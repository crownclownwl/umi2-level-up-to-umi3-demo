/**
 * @description 专门用来设置页面中的属性变量，达到统一的配置，免得总是修改代码
 * @author 王磊（磊皇）
 * @time 2020年2月26日 09点52分
 * @lastEditTime 2020年2月26日 10点17分
 * @lastEditors 王磊（磊皇）
 */

/**
 * @descriptio 审批流程类型，
 *             注意：如果需要动态修改actType的话，请再页面中覆盖 window.actType 即可
 * @author 王磊（磊皇）
 * @time 2020年2月26日 09点52分
 * @lastEditTime 2020年2月26日 09点52分
 * @lastEditors 王磊（磊皇）
 * @exports actType
 */
let actType = 1;

/**
 * @descriptio 设置应用的标题
 * @author 王磊（磊皇）
 * @time 2020年2月26日 10点17分
 * @lastEditTime 2020年2月26日 10点17分
 * @lastEditors 王磊（磊皇）
 * @exports appTitle
 */
let appTitle = "采购";



export {
    actType,
    appTitle
}
