import { SIGN_UP, USER_DATA } from "./../Actions/actionType";

const initialState = {
  signUpData: [],
  userData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.userData
      };
    case SIGN_UP:
      return {
        ...state,
        signUpData: action.signUpData
      };
    default:
      return state;
  }
};
export default reducer;
