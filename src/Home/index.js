import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Divider } from 'antd';
import { Link } from "react-router-dom"
import errorBoundary from 'shared/components/ErrorBoundary';

import getExaminationLists from './action';
import './styles.less';

const columns = [
  {
    title: '试卷编号',
    key: 'id',
    dataIndex: 'id'
  },
  {
    title: '试卷名称',
    key: 'title',
    dataIndex: 'title'
  },
  {
    title: '操作',
    key: 'menu',
    render: ({ id }) => {
      return (
        <Button
          type="primary"
          icon="edit"
        >
          <Link to={`/detail/${id}`} style={{color:"#fff",marginLeft:10}}>立即答题</Link>
        </Button>
      );
    }
  }
];

@connect(
  ({ HomeReducer: { lists } }) => ({
    lists
  }),
  dispatch =>
    bindActionCreators(
      {
        getExaminationLists
      },
      dispatch
    )
)
@errorBoundary
export default class ExaminationLists extends PureComponent {
  state = {
    loading: false
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { lists } = this.props;
    const { loading } = this.state;

    return (
      <div key="home" className="home">
        <Divider>在线答题试卷列表</Divider>
        <Table
          loading={loading}
          rowKey="id"
          dataSource={lists}
          columns={columns}
        />
      </div>
    );
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.getExaminationLists({}, () => {
      this.setState({ loading: false });
    });
  }
}
