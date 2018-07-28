import fetch from 'libs/fetch';
export const GET_EXAMINATION_LISTS = 'get_examination_lists';

/**
 * @param {Any} params
 */
export default (params = {},cb) => async dispatch => {
  //TODO: fetching examination lists
  const lists = await fetch.getMockJson("/examination.json");
  dispatch({
    type: GET_EXAMINATION_LISTS,
    lists
  });
  cb && cb(lists)
};
