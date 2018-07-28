import { GET_EXAMINATION_DETAIL } from "../action";
const defaultState = {
  detail: {}
};
export default function(state = defaultState, action) {
  const { type, detail } = action;
  switch (type) {
    case GET_EXAMINATION_DETAIL:
      return {
        ...state,
        detail
      };
    default:
      return state;
  }
}
