/**
 * 日历组件的配置的类型约束
 * @interface
 * @exports ICalendarConfig
 */
export default interface ICalendarConfig {
    locale?: object;
    type: string;
    pickTime: boolean;
}