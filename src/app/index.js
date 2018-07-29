import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'; //5.0 移除了 history 需要手动引入 history依赖
import { Home, paperDetail, Login } from 'libs/routes';
import NotFound from 'app/components/NotFound';
import history from 'libs/history';

import './styles.less';

const isLogin = sessionStorage.getItem('login');

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isLogin ? <Home/> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/home"
              component={Home}
            />
            <Route path="/login" component={Login} />
            <Route path="/detail/:id" component={paperDetail} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    );
  }
}

export default hot(module)(App);
