/**
 * 所有dispatch 方法的类型约束
 * @interface
 */
export default interface IDispathParam {
    type: string | undefined;
    daylog?: object | null;
    callback?: Function | undefined;
}

/**
 * @author 王磊
 * @description 用来定义dispatch 中的callback 的返回值
 * @interface
 * @exports IResponseParam
 */
export default interface IResponseParam {
    status:boolean;
    msg:string;
    data? : any;  // 可能需要的后台相应数据
}