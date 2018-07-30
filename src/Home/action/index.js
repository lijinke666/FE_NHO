import fetch from "libs/fetch";
export const GET_PAPER_LISTS = "get_paper_lists";

/**
 * @param {Any} params
 */
export default (params = {}, cb) => async dispatch => {
  //TODO: fetching paper lists
  const paperLists = await fetch.getMockJson("/papers");
  dispatch({
    type: GET_PAPER_LISTS,
    paperLists
  });
  cb && cb(paperLists);
};
