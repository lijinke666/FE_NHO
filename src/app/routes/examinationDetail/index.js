import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Radio, Button, message } from 'antd';
import  getExaminationDetail from "./action" 
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import "./styles.less"
@connect(
  ({ HomeReducer: { lists } }) => ({
    lists
  }),
  dispatch =>
    bindActionCreators(
      {
        getExaminationDetail
      },
      dispatch
    )
)
class examinationDetail extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        //TODO: submit
        console.log(values);
        message.info('TODO:')
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="detail-form">
          <FormItem {...formItemLayout} label="题目1">
            {getFieldDecorator('group1')(
              <RadioGroup>
                <Radio value="a">选项1</Radio>
                <Radio value="b">选项2</Radio>
                <Radio value="c">选项3</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="题目2">
            {getFieldDecorator('group2')(
              <RadioGroup>
                <Radio value="a">选项1</Radio>
                <Radio value="b">选项2</Radio>
                <Radio value="c">选项3</Radio>
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
  componentDidMount(){
    const {id} = this.props.match.params
    this.props.getExaminationDetail(id)
  }
}

export default Form.create()(examinationDetail);
