import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Radio, Button, message, Divider, Modal } from 'antd';
import getPaperQuestions, { submitQuestions } from './action';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import './styles.less';
@connect(
  ({ HomeReducer: { lists } }) => ({
    lists
  }),
  dispatch =>
    bindActionCreators(
      {
        getPaperQuestions,
        submitQuestions
      },
      dispatch
    )
)
class examinationDetail extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //TODO: submit
        const questions = Object.values(values);
        if (questions.some(question => !question)) {
          Modal.confirm({
            title: '你以下题还没答,确定提交吗?',
            onOk() {
              //TODO:
              this.props.submitQuestions(values);
            }
          });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="detail-form">
          <Divider>试卷标题</Divider>
          <FormItem {...formItemLayout} label="题目1">
            {getFieldDecorator('question-a')(
              <RadioGroup>
                <Radio value="a">选项1</Radio>
                <Radio value="b">选项2</Radio>
                <Radio value="c">选项3</Radio>
                <Radio value="d">选项4</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="题目2">
            {getFieldDecorator('question-b')(
              <RadioGroup>
                <Radio value="a">选项1</Radio>
                <Radio value="b">选项2</Radio>
                <Radio value="c">选项3</Radio>
                <Radio value="d">选项4</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem>
            <Button
              icon="plus"
              type="primary"
              htmlType="submit"
              className="detail-form-button"
            >
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPaperQuestions({id});
  }
}

export default Form.create()(examinationDetail);
