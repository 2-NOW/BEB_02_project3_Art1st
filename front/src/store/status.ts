import { atom } from 'recoil';

export const successState = atom({
  key: 'successState',
  default: false,
});

export const errorState = atom({
  key: 'errorState',
  default: false,
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
