import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({[key]: e.target.value});
  };

  handleLogin = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    if (this.state.email === '' ||
        this.state.password === '') {
      this.setState({
        errorMessage: '이메일과 비밀번호를 입력하세요'
      })
    } else {
      axios.post("https://3.35.231.200:4000/signin", {
        email: this.state.email,
        password: this.state.password
      }).then(() => {
        this.props.handleResponseSuccess()
      }).catch((e) => console.log(e))
    }
  };

  render() {
    return (
        <div>
          <center>
            <h1>Sign In</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <span>이메일</span>
                <input type='email' onChange={this.handleInputValue("email")}/>
              </div>
              <div>
                <span>비밀번호</span>
                <input type='password' onChange={this.handleInputValue("password")}/>
              </div>
              <div>
                <Link to='/signup'>아직 아이디가 없으신가요?</Link>
              </div>
              <button className='btn btn-login' type='submit' onClick={this.handleLogin}>
                로그인
              </button>
              {
                this.state.errorMessage.length !== 0 ?
                    <div className="alert-box">이메일과 비밀번호를 입력하세요</div> :
                    null
              }
            </form>
          </center>
        </div>
    );
  }
}

export default withRouter(Login);
