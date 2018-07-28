import fetch from 'libs/fetch';
export const GET_EXAMINATION_DETAIL = 'get_examination_detail';

/**
 * @param {Any} params
 */
export default (params = {},cb) => async dispatch => {
  //TODO: fetching examination lists
  const detail = await fetch.getMockJson("/examination.json");
  dispatch({
    type: GET_EXAMINATION_DETAIL,
    detail
  });
  cb && cb(detail)
};
