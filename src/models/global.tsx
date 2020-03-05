// @ts-ignore
import { query } from '@/services/api';

export default {
  namespace: 'global',
  state: {
    chapterData: [],
    listViewData: {     // 全局存储列表状态
        // 普通的长列表的数据
        dataSource: [],
        // 待办事项长列表的数据
        todoDataSource: [],
        // 已办事项长列表的数据
        alreadyDataSource: [],
        // 查询条件的数据
        filterDataSource: [],
        // 查询条件的请求名称
        filterRqeustParams: [],
        selectedTabIndex:0,       // 当前选择的tab页面的索引
        theFirstTabIsFirst:true,  // 第一个tab页面是否第一次加载，默认是
        theSecoundTabIsFirst:true,  // 第二个tab页面是否第一次加载，默认是

        // 待办事项查询条件的数据
        todoListFilterDataSource: [],
        // 待办事项查询条件的请求名称
        todoListFilterRqeustParams: [],

        // 已办事项查询条件的数据
        alreadyListFilterDataSource:[],
        // 已办事项查询条件的请求名称
        alreadyListFilterRqeustParams:[],

        // 搜索条件
        startDate:'',     // 开始时间
        endDate:'',       // 结束时间
        remarks:'',       // 事项描述
        status:'',              // 审批状态
        applyPerson:'',         // 申请人
        isFromDetail: false,    // 是否从详情页面跳转的
        refreshing:false,
        hadMore: true, // 没有更多了
        hadMore1: true, // 已办没有更多了
        loading: false, // 是否正在刷新
        isAll: false, // 是否是全部数据
        isAll1: false, // 已办是否是全部数据
        page: 1, // 当前页
        pageNo: 1, // 当前页
        pageSize: 10, // 每页显示多少条

        total: 0, // 总页数

        currentScroll: 0, // ListView 滚动位置

        todoListScroll: 0, // 待办事项ListView 滚动位置
        alreadyListScroll: 0 // 已办事项ListView 滚动位置
    }
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
