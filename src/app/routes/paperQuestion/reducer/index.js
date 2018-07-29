import { GET_PAPER_QUESTIONS, SUBMIT_PAPER_QUESTIONS } from '../action';
const defaultState = {
  questions: [],
  score:0
};
export default function(state = defaultState, action) {
  const { type, questions,score } = action;
  switch (type) {
    case GET_PAPER_QUESTIONS:
      return {
        ...state,
        questions
      };
    case SUBMIT_PAPER_QUESTIONS:
      return {
        ...state,
        score
      }
    default:
      return state;
  }
}
