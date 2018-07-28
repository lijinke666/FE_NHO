import { GET_EXAMINATION_LISTS } from "../action";
const defaultState = {
  lists: []
};
export default function(state = defaultState, action) {
  const { type, lists } = action;
  switch (type) {
    case GET_EXAMINATION_LISTS:
      return {
        ...state,
        lists
      };
    default:
      return state;
  }
}
