import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux"; //5.0 移除了 history 需要手动引入 history依赖
import { Home,examinationDetail } from "libs/routes";
import NotFound from "app/components/NotFound";
import history from "libs/history";

import "./styles.less";

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/home"
              render={() => <Redirect to="/" />}
              component={Home}
            />
            <Route path="/test" component={()=><div>11</div>} />
            <Route path="/detail/:id" component={examinationDetail} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    );
  }
}

export default hot(module)(App);
