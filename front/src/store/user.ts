import { atom } from 'recoil';

const userIdState = atom({
  key: 'userIdState', // unique ID (with respect to other atoms/selectors)
  default: NaN, // default value (aka initial value)
});

// user id
// login
