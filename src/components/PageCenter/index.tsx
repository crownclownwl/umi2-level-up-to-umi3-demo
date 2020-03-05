import React from 'react';
import styles from './index.less';
import {connect} from 'dva';

/**
 * 用来设置内容显示在页面的正中心
 * 需要给组件传值列表
 *      @param content 需要显示的内容，注意需要带上标签，如：<h2>你要显示的内容</h2>
 */
export default class PageCenter extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    /**
     * 初始化页面内容方法，该方法用来处理页面加载
     * @param content 需要显示的内容，注意需要带上标签，如：<h2>你要显示的内容</h2>
     */
    initPage(content){
        if(content){
            return (
                content
            )
        }
        return (
            <h2>请输入组件内容！</h2>
        )
        
    }

    render() {
        let content = this.props.content;

        return (
            <div className={styles.pageCenterDiv}>
                {this.initPage(content)}
            </div>
        )
    }
}