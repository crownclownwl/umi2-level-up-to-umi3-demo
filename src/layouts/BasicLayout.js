import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
// import MenuBar from '@/components/MenuBar';
import styles from './BlankLayout.less';

export default props => {
  // console.log(props,"看看这是")
  // console.log(window.url)
  return (
    <div className={styles.normal}>
      {window.H5_Dev === 'dev' ? (
        <NavBar
          mode="dark"
          icon={
            <Icon
              type="left"
              onClick={() => {
                router.goBack();
              }}
            />
          }
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          随堂考
        </NavBar>
      ) : (
        ''
      )}
      {props.children}
      {/*<div id='box-menubar' style={{ position: 'fixed', height: 'auto', width: '100%', bottom: 0 }} ><MenuBar pathname={props.location.pathname}></MenuBar></div>*/}
    </div>
  );
};
