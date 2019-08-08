import { SIGN_UP, USER_DATA } from "./actionType";

export const setUserData = userData => {
  return {
    type: USER_DATA,
    userData: userData
  };
};
export const setSignUpData = signUpData => {
  return {
    type: SIGN_UP,
    signUpData: signUpData
  };
};
