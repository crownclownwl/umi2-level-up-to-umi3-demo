/*
 * @description: umijs 的配置文件
 * @author: 王磊（磊皇）
 * @time: 2020年3月2日 11点59分
 * @lastEditTime: 2020年3月2日 11点59分
 * @lastEditors: 王磊（磊皇）
 */

// https://umijs.org/config/
import theme from '../src/theme';
import webpackPlugin from './plugin.config';


export default {
  // add for transfer to umi
  publicPath: './',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
    'window.H5_Dev': process.env.H5_Dev,
  },
  history: { type: 'hash' }, // 默认是 browser
  antd: false,
  dva: {
    hmr: true,
  },
  // dynamicImport: {
  //   // loadingComponent: './components/PageLoading/index',
  //   webpackChunkName: true,
  //   level: 3,
  // },
  // title: {
  //   defaultTitle: 'umi-dva-antd-mobile',
  // },
  title:"umi3 + dva + ant-mobile模板",
  //   exportStatic: {},
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  theme: {
    'brand-primary': theme.primaryColor,
    'brand-primary-tap': theme.brandPrimaryTap,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 11,
    safari: 10,
  },
  outputPath: './dist',
  hash: true,
  alias: {},
  proxy: {
      // 代理管理系统
      '/guanlixitong': {
        changeOrigin: true,
      },
      '/platform': {
        target: 'http://127.0.0.1:8009', // 本机开发
        changeOrigin: true,
      },
  },
  ignoreMomentLocale: true,
  lessLoader: {
    // 这里配置全局变量
    globalVars: {},
    javascriptEnabled: true,
    //   plugins: [
    //         //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
    //         require('postcss-import')(),
    //         require("autoprefixer")({
    //             "overrideBrowserslist": ["Android >= 5.0", "iOS >= 9.0", "ie >= 11"]
    //         })
    //   ]
  },
  autoprefixer: {
    flexbox: 'no-2009', // 开启针对 flexbox的前缀
    grid: 'autoplace', // 开启 对 ie 浏览器前缀的 grid 支持
    supports: true, // 开启 @supports 传参
    remove: true, // 禁止删除过时的前缀
  },
  cssLoader: {
    modules: true,
  },
  manifest: {
    basePath: '/',
  },

  // 配置 react 和 react-dom 不打入代码 umi.js 减小100k左右：——（
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    axios: 'axios',
    lodash: '_',
    moment: 'moment',
    antd: 'antd',
    'antd-mobile': 'AntdMobile',
  },
  chainWebpack: webpackPlugin,
};
