import { GET_PAPER_LISTS } from "../action";
const defaultState = {
  paperLists: []
};
export default function(state = defaultState, action) {
  const { type, paperLists } = action;
  switch (type) {
    case GET_PAPER_LISTS:
      return {
        ...state,
        paperLists
      };
    default:
      return state;
  }
}
