import fetch from "libs/fetch";
export const TEST_ACTION = "test_action";

/**
 * @param {Any} params
 */
export default (params = {}) => async dispatch => {;
    dispatch({
      type: TEST_ACTION,
      loading: false
    });
};
