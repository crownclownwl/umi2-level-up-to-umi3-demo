/**
 * 利用空白页面进行重定向
 */
import React from 'react';


interface BlankPageState {
}

interface BlankPageProps {
    location: any,
    history: any,
}

class BlankPage extends React.Component<BlankPageProps, BlankPageState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
    let redirectRoute = this.props.location.query.a;
    if (redirectRoute.indexOf('#') == 0) {
      redirectRoute = redirectRoute.substring(1);
    }

    console.log(redirectRoute);
    this.props.history.replace(redirectRoute);
    // <Redirect to={redirectRoute} />
  }

  render() {
    return (
      <>{/* <Redirect to={redirectRoute} /> */}</>
    );
  }
}

export default BlankPage;
