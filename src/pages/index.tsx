/**
 * @description 入口文件
 * @author 王磊
 * @time 2019年12月20日 13:57:52
 * @lastEditTime 2019年12月20日 13:57:52
 * @lastEditors 王磊
 */
import React from 'react';
import { Route, Redirect } from 'react-router'

interface HomePageProps{

}
interface HomePageStates{
    
}
class index extends React.Component<HomePageProps, HomePageStates> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {

    };
  }
  render() {

    return (
      <>
        <Route exact path="/" render={() => (
          <Redirect to="/main" />
        )} />
      </>
    );
  }
}

export default index;