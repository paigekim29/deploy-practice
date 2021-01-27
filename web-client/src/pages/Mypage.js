import React from 'react';

function Mypage(props) {
  return props.userinfo == null ? (
      <div></div>
  ) : (
      <div>
        <div>
          <h1>Mypage</h1>
          <button className='btn-logout' onClick={props.handleLogout}>
            logout
          </button>
        </div>
        <hr/>
        <div>
          <div className='username'>{props.userinfo.username}</div>
          <div className='email'>{props.userinfo.email}</div>
          <div className='mobile'>{props.userinfo.mobile}</div>
        </div>
      </div>
  );
}

export default Mypage;