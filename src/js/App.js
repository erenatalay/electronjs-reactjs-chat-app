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
import ChatCreate from "./views/ChatCreate";
import LoadingView from "./components/shared/LoadingView";

import { listenToAuthChanges } from "./actions/auth";
import { listenToConnectionChanges } from "./actions/app";
import { checkUserConnection } from "./actions/connection";
import { loadInitialSettings } from "./actions/settings";

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user)
  const onlyChild = React.Children.only(children)
  return (
    <Route
      {...rest}
      render={props =>
        user ? React.cloneElement(onlyChild, { ...rest, ...props }) :
          <Redirect to="/" />
      }
    />
  )
}

const ContentWrapper = ({children}) => {
  const isDarkTheme  = useSelector(({settings}) => settings.isDarkTheme);
  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
  )
}

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());
    return () => {
      unsubFromAuth()
      unsubFromConnection();
    }
  }, [dispatch])


  useEffect(() => {
    let unSubFromUserConnection;

    if (user?.uid) {
      unSubFromUserConnection = dispatch(checkUserConnection(user.uid));

    }

    return () => {
      unSubFromUserConnection &&  unSubFromUserConnection();

    }

  }, [dispatch, user])
  if (!isOnline) {
    return <LoadingView message="Application has been disconnected from the internet." />
  }

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

          <AuthRoute path="/chatCreate">
            <ChatCreate />
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