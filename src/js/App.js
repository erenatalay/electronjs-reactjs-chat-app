import React, { useEffect } from "react";
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
import WelcomeView from "./views/Welcome";
import ChatView from "./views/Chat";
import { listenToAuthChanges } from "./actions/auth";
const store = configureStore();


const App = () => {
  useEffect(() => {
    store.dispatch(listenToAuthChanges())
  }, [])

  return (
<Provider store={store}>
    <Router >
            <Navbar />
            <div className='content-wrapper'>

      <Switch>
      <Route  path="/" exact>
          <WelcomeView/>
        </Route>


        <Route  path="/home">
          <Homeview />
        </Route>

        <Route  path="/chat/:id">
          <ChatView/>
        </Route>

        <Route  path="/settings">
          <SettingsView/>
        </Route>

 

        {/* <Route  path="/register">
        <RegisterView/>

        </Route>
  */}

      </Switch>
    </div>

    </Router>
    </Provider>
  )
}

export default App;