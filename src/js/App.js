import React from "react";
import {Provider} from 'react-redux';
import configureStore from "./store"
import Homeview from "./views/Home";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Navbar from "./components/Navbar";
import SettingsView from "./views/Settings";
import LoginView from "./views/Login";
import RegisterView from "./views/Register";
import ChatView from "./views/Chat";

const store = configureStore();


const App = () => {

  return (
<Provider store={store}>
    <Router >
            <Navbar />
            <div className='content-wrapper'>

      <Switch>

        <Route exact path="/">
          <Homeview />
        </Route>

        <Route  path="/chat/:id">
          <ChatView/>
        </Route>

        <Route  path="/settings">
          <SettingsView/>
        </Route>

        <Route  path="/login">
          <LoginView/>
        </Route>

        <Route  path="/register">
        <RegisterView/>

        </Route>

      </Switch>
    </div>

    </Router>
    </Provider>
  )
}

export default App;