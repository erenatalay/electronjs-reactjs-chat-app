import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Homeview from "./views/Home";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import StoreProvider from "./store/StoreProvider";
import SettingsView from "./views/Settings";
import WelcomeView from "./views/Welcome";
import ChatView from "./views/Chat";
import LoadingView from "./components/shared/LoadingView";

import { listenToAuthChanges } from "./actions/auth";

const AuthRoute = ({children, ...rest}) => {
  const user = useSelector(({auth}) => auth.user)
  const onlyChild = React.Children.only(children)
  return(
      <Route
      {...rest}
        render={props => 
          user ? React.cloneElement(onlyChild,{...rest,...props}) : 
          <Redirect to="/"/>
        }
      />
  )
}

const ContentWrapper = ({ children }) => <div className='content-wrapper'>{children}</div>

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking)
  useEffect(() => {
    dispatch(listenToAuthChanges())
  }, [dispatch])

  if (isChecking) {
    return <LoadingView />
  }
  return (
    <Router >
      <ContentWrapper>

        <Switch>
          <Route path="/" exact>
            <WelcomeView />
          </Route>

          <AuthRoute path="/home">
            <Homeview />
          </AuthRoute>

          <AuthRoute path="/chat/:id">
            <ChatView />
          </AuthRoute>

          <AuthRoute path="/settings">
            <SettingsView />
          </AuthRoute>

        </Switch>
      </ContentWrapper>

    </Router>
  )
}




const App = () => {
  return (
    <StoreProvider>
      <ChatApp />

    </StoreProvider>
  )
}

export default App