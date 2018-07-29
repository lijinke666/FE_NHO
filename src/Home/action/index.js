import fetch from 'libs/fetch';
export const GET_PAPER_LISTS = 'get_paper_lists';

/**
 * @param {Any} params
 */
export default (params = {},cb) => async dispatch => {
  //TODO: fetching paper lists
  const lists = await fetch.getMockJson("/paper.json");
  dispatch({
    type: GET_PAPER_LISTS,
    lists
  });
  cb && cb(lists)
};
