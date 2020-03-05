/**
 * @description 入口文件
 * @author 王磊
 * @time 2019年12月20日 13:57:52
 * @lastEditTime 2019年12月20日 13:57:52
 * @lastEditors 王磊
 */
import React from 'react';

interface IMainPageProps{

}
interface ImainPageStates{
    
}
class Main extends React.Component<IMainPageProps, ImainPageStates> {
  constructor(props: IMainPageProps) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <>
        Welcome to umi3Demo！！！
      </>
    );
  }
  componentDidMount(){
    debugger
  }
}

export default Main;