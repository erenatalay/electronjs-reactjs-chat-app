import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import LoadingView from '../components/shared/LoadingView';
const Welcome = () => {
  const [isLoginView,setisLogin] = useState(true);
  const user = useSelector(({auth}) => auth.user)
  const isChecking = useSelector(({auth}) => auth.isChecking)
  const opInText = isLoginView ? 
  ["Need an account ?","Register"] : 
  ["Aldready registered", "Login"]

  if(isChecking){
    return <LoadingView/>
  }

  if (user) {
    return <Redirect to="/home"/>
  }
    return (
        <div className="centered-view">
        <div className="centered-container">
          {isLoginView ? <LoginForm/> : <RegisterForm/>}
          <small className="form-text text-muted mt-2">{opInText[0]}
            <span
              onClick={() => setisLogin(!isLoginView)}
              className="btn-link ml-2">{opInText[1]}</span></small>
        </div>
      </div>
    )
}

export default Welcome
