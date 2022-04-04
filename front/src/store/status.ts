import { atom } from 'recoil';

// login
export const loginLoadingState = atom({
  key: 'loadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const loginErrorState = atom({
  key: 'errorState',
  default: false,
});

export const loginSuccessState = atom({
  key: 'loginSuccessState',
  default: false,
});

// sign up
export const signUpLoadingState = atom({
  key: 'signUpLoadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const signUpErrorState = atom({
  key: 'signUpErrorState',
  default: false,
});

export const signUpSuccessState = atom({
  key: 'signUpSuccessState',
  default: false,
});

// user profile 수정
export const userProfileLoadingState = atom({
  key: 'userProfileLoadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const userProfileErrorState = atom({
  key: 'userProfileErrorState',
  default: false,
});

export const userProfileSuccessState = atom({
  key: 'userProfileSuccessState',
  default: false,
});
