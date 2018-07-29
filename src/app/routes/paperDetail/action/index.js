import fetch from 'libs/fetch';
export const GET_PAPER_QUESTIONS = 'get_paper_questions';
export const SUBMIT_PAPER_QUESTIONS = 'submit_paper_questions';

/**
 * @param {Any} params
 */
export default ({id} = {}) => async dispatch => {
  //TODO: fetching paper lists
  const questions = await fetch.getMockJson(`/papers/${id}/questions`);
  dispatch({
    type: GET_PAPER_QUESTIONS,
    questions
  });
};

export const submitQuestions = ({id,questions} = {}) => async dispatch => {
  //TODO: submit questions
  const data = await fetch.postMockJson(`/papers/${id}/questions`);
  dispatch({
    type: SUBMIT_PAPER_QUESTIONS,
    data
  });
};
