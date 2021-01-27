import React from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import axios from "axios";


class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };


  handleResponseSuccess() {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    axios.defaults.withCredentials = true;
    axios.get("https://3.35.231.200:4000/user")
        .then(data => {
          this.setState({
            userinfo: data.data,
            isLogin: !this.state.isLogin
          })
          console.log(this.state)
        }).then(() => this.props.history.push("/"))
        // .catch(() => {
        //   this.setState({
        //     isLogin: !this.state.isLogin
        //   })
        //   this.props.history.push("/")
        // })
  }

  handleLogout(){
    console.log(1111)
    axios.defaults.withCredentials = true;
    axios.post("https://3.35.231.200:4000/signout")
        .then(()=>{
          this.setState({
            isLogin: !this.state.isLogin,
          })
          this.props.history.push("/")
        })
  };

  render() {
    const {isLogin, userinfo} = this.state;

    return (
        <div>
          <Switch>
            <Route
                path='/login'
                render={() => (
                    <Login
                        handleResponseSuccess={this.handleResponseSuccess.bind(this)}
                    />
                )}
            />
            <Route exact path='/signup' render={() => <Signup/>}/>
            <Route
                exact
                path='/mypage'
                render={() => <Mypage
                    userinfo={userinfo}
                    handleLogout={this.handleLogout.bind(this)}
                />}
            />
            <Route
                path='/'
                render={() => {
                  if (isLogin) {
                    return <Redirect to='/mypage'/>;
                  }
                  return <Redirect to='/login'/>;
                }}
            />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
