/**
 * 课堂考勤主页面的state类型约束
 * @interface
 * @exports IClassAttendancesState
 */
export default interface viewModificationState {
    refreshing: any;
    isLoading: boolean;
    data:Array<any>;
    stepList:Array<any>;
    isTrue:boolean;
    isRead:boolean;
}