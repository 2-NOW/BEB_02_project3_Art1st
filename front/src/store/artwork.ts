import { atom } from 'recoil';

const artworkIdState = atom({
  key: 'artworkIdState', // unique ID (with respect to other atoms/selectors)
  default: NaN, // default value (aka initial value)
});
