import { GET_EXAMINATION_DETAIL,SUBMIT_PAPER_QUESTIONS } from "../action";
const defaultState = {
  questions: []
};
export default function(state = defaultState, action) {
  const { type, questions, } = action;
  switch (type) {
    case GET_EXAMINATION_DETAIL:
      return {
        ...state,
        questions
      };
    case SUBMIT_PAPER_QUESTIONS:
      return {
        ...state
      }
    default:
      return state;
  }
}
