import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Divider, Button, message, Spin } from 'antd';
import errorBoundary from 'shared/components/ErrorBoundary';

import sayHello from './action';
import './styles.less';

@connect(
  ({ HomeReducer }) => ({
    data: HomeReducer.data,
    loading: HomeReducer.loading
  }),
  dispatch =>
    bindActionCreators(
      {
        sayHello
      },
      dispatch
    )
)
@errorBoundary
export default class Home extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { loading } = this.props;

    return (
      <div key="home" className="home">
        {loading ? (
          <Spin tip={`Welcome to use Dawdler.`} size="large" />
        ) : (
          <h2>hello world</h2>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.props.sayHello();
  }
}
