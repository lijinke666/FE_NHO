import loadable from "react-loadable"; //异步加载  react-router3 可以使用getComponent react-router4没这个api了
import React from "react";
import { Spin } from "antd";
const Loading = () => <Spin />;

//按需加载路由
const loadRoute = loader => {
  return loadable({
    loader: () => loader,
    loading: Loading
  });
};

const Home = loadRoute(import(/* webpackChunkName: "home" */ "Home")); //主页
const paperQuestion = loadRoute(
  import(/* webpackChunkName: "paperQuestion" */ "app/routes/paperQuestion")
); //试卷列表
const Login = loadRoute(
  import(/* webpackChunkName: "login" */ "app/routes/Login")
); //登录

export { Home, paperQuestion, Login };
