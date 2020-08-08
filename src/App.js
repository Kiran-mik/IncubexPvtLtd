
import React, { Component, lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


const DashBoard = lazy(() => import("../src/pages/dashBoard"));
const Addrecord = lazy(() => import("../src/pages/newTask"));


class App extends Component {
  Authorization = () => {
    return localStorage.getItem('token') ? true : false
  }
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.Authorization() ?
          <Component {...props} />
          : <Redirect to='/' />
      )} />
    );
    const LoginCheckRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.Authorization()
          ? <Redirect to='/dashboard' />
          : <Component {...props} />
      )} />
    );

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<div></div>}>
            <Router>
              <Switch>
                <Route exact path="/" component={DashBoard} />
                <Route exact path="/addRecord" component={Addrecord} />
                <Route exact path="/editRecord" component={Addrecord} />
              </Switch>
            </Router>
          </Suspense>
        </PersistGate >
      </Provider>
    );
  }
}
export default App;
