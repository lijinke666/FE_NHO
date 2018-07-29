import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Radio, Button, message, Divider, Modal } from 'antd';
import getPaperQuestions, { submitQuestions } from './action';

const { Item: FormItem } = Form;
const { Group: RadioGroup } = Radio;

const QUESTION_SCORE = 20
import './styles.less';

@connect(
  ({ PaperQuestionReducer: { questions, score } }) => ({
    questions,
    score
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
class paperQuestion extends Component {
  state = {
    fetching: false,
    isSubmitQuestion: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //TODO: submit
        const questions = Object.values(values);
        if (questions.some(question => !question)) {
          Modal.confirm({
            title: '你还有未回答的题,确定提交吗?',
            onOk: () => this._submitQuestions(values)
          });
        } else {
          this._submitQuestions(values);
        }
      }
    });
  };
  _submitQuestions = question => {
    const hide = message.loading('正在提交试卷,请稍后...');
    this.setState({ fetching: true });
    this.props.submitQuestions(question, () => {
      message.success('答题成功!');
      this.setState({ isSubmitQuestion: true, fetching: false });
      this.props.form.resetFields();
      hide();
    });
  };
  render() {
    const {
      questions,
      score,
      form: { getFieldDecorator }
    } = this.props;

    const { isSubmitQuestion, fetching } = this.state;

    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    if (questions.length < 1) {
      return <span>暂无题目...</span>;
    }
    return (
      <Form onSubmit={this.handleSubmit} className="detail-form">
        <Divider>试卷标题</Divider>
        {isSubmitQuestion ? (
          <div className="score">
            <i>{score}</i>
          </div>
        ) : (
          undefined
        )}

        {questions.map(({ context, id, options }, i) => {
          return (
            <FormItem
              {...formItemLayout}
              label={`${i + 1}. ${context} (${QUESTION_SCORE}分)`}
              key={context}
            >
              {getFieldDecorator(`${context}`)(
                <RadioGroup>
                  {options.map(({ id: optionId, context: optionTitle }, i) => {
                    return (
                      <Radio value={optionTitle} key={String(optionTitle)}>
                        {optionTitle}
                      </Radio>
                    );
                  })}
                </RadioGroup>
              )}
            </FormItem>
          );
        })}
        <FormItem>
          <Button
            loading={fetching}
            size="large"
            icon="plus"
            type="primary"
            htmlType="submit"
            className="detail-form-button"
          >
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPaperQuestions({ id });
  }
}

export default Form.create()(paperQuestion);
